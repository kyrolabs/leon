import type { FastifyPluginAsync } from 'fastify'

import type { APIOptions } from '@/core/http-server/http-server'
import { LLMDuties } from '@/core/llm-manager/types'
import { CustomNERLLMDuty } from '@/core/llm-manager/llm-duties/custom-ner-llm-duty'
import { SummarizationLLMDuty } from '@/core/llm-manager/llm-duties/summarization-llm-duty'
import { TranslationLLMDuty } from '@/core/llm-manager/llm-duties/translation-llm-duty'
import { ParaphraseLLMDuty } from '@/core/llm-manager/llm-duties/paraphrase-llm-duty'
import { ChitChatLLMDuty } from '@/core/llm-manager/llm-duties/chit-chat-llm-duty'
import { LLM_MANAGER } from '@/core'

interface PostLLMInferenceSchema {
  body: {
    dutyType: LLMDuties
    systemPrompt: string
    input: string
    data: Record<string, unknown>
  }
}

const LLM_DUTIES_MAP = {
  [LLMDuties.CustomNER]: CustomNERLLMDuty,
  [LLMDuties.Summarization]: SummarizationLLMDuty,
  [LLMDuties.Translation]: TranslationLLMDuty,
  [LLMDuties.Paraphrase]: ParaphraseLLMDuty,
  [LLMDuties.ChitChat]: ChitChatLLMDuty
}

export const postLLMInference: FastifyPluginAsync<APIOptions> = async (
  fastify,
  options
) => {
  fastify.route<{
    Body: PostLLMInferenceSchema['body']
  }>({
    method: 'POST',
    url: `/api/${options.apiVersion}/llm-inference`,
    handler: async (request, reply) => {
      const params = request.body

      try {
        if (!LLM_MANAGER.isLLMEnabled) {
          reply.statusCode = 400
          reply.send({
            success: false,
            status: reply.statusCode,
            code: 'llm_not_enabled',
            message: 'LLM is not enabled.'
          })

          return
        }

        if (!LLM_DUTIES_MAP[params.dutyType]) {
          reply.statusCode = 400
          reply.send({
            success: false,
            status: reply.statusCode,
            code: 'llm_duty_not_supported',
            message: `LLM duty type "${params.dutyType}" not supported.`
          })

          return
        }

        let llmResult

        // TODO: use long-live duty for chit-chat duty

        if (params.dutyType === LLMDuties.ChitChat) {
          const chitChatLLMDuty = new ChitChatLLMDuty()
          await chitChatLLMDuty.init()

          llmResult = await chitChatLLMDuty.execute()
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const duty = new LLM_DUTIES_MAP[params.dutyType](params)
          llmResult = await duty.execute()
        }

        reply.send({
          success: true,
          status: 200,
          code: 'llm_duty_executed',
          message: 'LLM duty executed.',
          ...llmResult
        })
      } catch (error) {
        const message = error instanceof Error ? error.message : error
        reply.statusCode = 500
        reply.send({
          success: false,
          status: reply.statusCode,
          code: 'llm_duty_execution_error',
          message
        })
      }
    }
  })
}
