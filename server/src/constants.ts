import path from 'node:path'
import fs from 'node:fs'

import dotenv from 'dotenv'

import type { LongLanguageCode } from '@/types'
import { SystemHelper } from '@/helpers/system-helper'

dotenv.config()

const PRODUCTION_ENV = 'production'
const DEVELOPMENT_ENV = 'development'
const TESTING_ENV = 'testing'

export const GITHUB_URL = 'https://github.com/leon-ai/leon'

/**
 * Binaries / distribution
 */
export const BINARIES_FOLDER_NAME = SystemHelper.getBinariesFolderName()
export const BRIDGES_PATH = path.join(process.cwd(), 'bridges')
export const NODEJS_BRIDGE_ROOT_PATH = path.join(BRIDGES_PATH, 'nodejs')
export const PYTHON_BRIDGE_ROOT_PATH = path.join(BRIDGES_PATH, 'python')
export const PYTHON_TCP_SERVER_ROOT_PATH = path.join(
  process.cwd(),
  'tcp_server'
)

export const NODEJS_BRIDGE_DIST_PATH = path.join(
  NODEJS_BRIDGE_ROOT_PATH,
  'dist'
)
export const PYTHON_BRIDGE_DIST_PATH = path.join(
  PYTHON_BRIDGE_ROOT_PATH,
  'dist'
)
export const PYTHON_TCP_SERVER_DIST_PATH = path.join(
  PYTHON_TCP_SERVER_ROOT_PATH,
  'dist'
)

export const NODEJS_BRIDGE_SRC_PATH = path.join(NODEJS_BRIDGE_ROOT_PATH, 'src')
export const PYTHON_BRIDGE_SRC_PATH = path.join(PYTHON_BRIDGE_ROOT_PATH, 'src')
export const PYTHON_TCP_SERVER_SRC_PATH = path.join(
  PYTHON_TCP_SERVER_ROOT_PATH,
  'src'
)

const NODEJS_BRIDGE_VERSION_FILE_PATH = path.join(
  NODEJS_BRIDGE_SRC_PATH,
  'version.ts'
)
const PYTHON_BRIDGE_VERSION_FILE_PATH = path.join(
  PYTHON_BRIDGE_SRC_PATH,
  'version.py'
)
const PYTHON_TCP_SERVER_VERSION_FILE_PATH = path.join(
  PYTHON_TCP_SERVER_SRC_PATH,
  'version.py'
)
export const [, NODEJS_BRIDGE_VERSION] = fs
  .readFileSync(NODEJS_BRIDGE_VERSION_FILE_PATH, 'utf8')
  .split("'")
export const [, PYTHON_BRIDGE_VERSION] = fs
  .readFileSync(PYTHON_BRIDGE_VERSION_FILE_PATH, 'utf8')
  .split("'")
export const [, PYTHON_TCP_SERVER_VERSION] = fs
  .readFileSync(PYTHON_TCP_SERVER_VERSION_FILE_PATH, 'utf8')
  .split("'")

export const NODEJS_BRIDGE_BIN_NAME = 'leon-nodejs-bridge.js'
export const PYTHON_BRIDGE_BIN_NAME = 'leon-python-bridge'
export const PYTHON_TCP_SERVER_BIN_NAME = 'leon-tcp-server'

export const PYTHON_TCP_SERVER_BIN_PATH = path.join(
  PYTHON_TCP_SERVER_DIST_PATH,
  BINARIES_FOLDER_NAME,
  PYTHON_TCP_SERVER_BIN_NAME
)
export const PYTHON_BRIDGE_BIN_PATH = path.join(
  PYTHON_BRIDGE_DIST_PATH,
  BINARIES_FOLDER_NAME,
  PYTHON_BRIDGE_BIN_NAME
)
export const NODEJS_BRIDGE_BIN_PATH = `${path.join(
  process.cwd(),
  'node_modules',
  'tsx',
  'dist',
  'cli.mjs'
)} ${path.join(NODEJS_BRIDGE_DIST_PATH, 'bin', NODEJS_BRIDGE_BIN_NAME)}`

export const LEON_VERSION = process.env['npm_package_version']

/**
 * spaCy models
 * @see Find new spaCy models: https://github.com/explosion/spacy-models/releases
 */
export const EN_SPACY_MODEL_NAME = 'en_core_web_trf'
export const EN_SPACY_MODEL_VERSION = '3.4.0'
export const FR_SPACY_MODEL_NAME = 'fr_core_news_md'
export const FR_SPACY_MODEL_VERSION = '3.4.0'

/**
 * Environments
 */
export const LEON_NODE_ENV = process.env['LEON_NODE_ENV'] || PRODUCTION_ENV
export const IS_PRODUCTION_ENV = LEON_NODE_ENV === PRODUCTION_ENV
export const IS_DEVELOPMENT_ENV = LEON_NODE_ENV === DEVELOPMENT_ENV
export const IS_TESTING_ENV = LEON_NODE_ENV === TESTING_ENV

/**
 * Leon environment preferences
 */
export const LANG = process.env['LEON_LANG'] as LongLanguageCode

export const HOST = process.env['LEON_HOST']
export const PORT = Number(process.env['LEON_PORT'])

export const TIME_ZONE = process.env['LEON_TIME_ZONE']

export const HAS_AFTER_SPEECH = process.env['LEON_AFTER_SPEECH'] === 'true'

export const HAS_STT = process.env['LEON_STT'] === 'true'
export const STT_PROVIDER = process.env['LEON_STT_PROVIDER']
export const HAS_TTS = process.env['LEON_TTS'] === 'true'
export const TTS_PROVIDER = process.env['LEON_TTS_PROVIDER']

export const HAS_OVER_HTTP = process.env['LEON_OVER_HTTP'] === 'true'
export const HTTP_API_KEY = process.env['LEON_HTTP_API_KEY']
export const HTTP_API_LANG = process.env['LEON_HTTP_API_LANG']

export const PYTHON_TCP_SERVER_HOST = process.env['LEON_PY_TCP_SERVER_HOST']
export const PYTHON_TCP_SERVER_PORT = Number(
  process.env['LEON_PY_TCP_SERVER_PORT']
)

export const IS_TELEMETRY_ENABLED = process.env['LEON_TELEMETRY'] === 'true'

/**
 * Paths
 */
export const BIN_PATH = path.join(process.cwd(), 'bin')
export const LOGS_PATH = path.join(process.cwd(), 'logs')
export const SKILLS_PATH = path.join(process.cwd(), 'skills')
export const GLOBAL_DATA_PATH = path.join(process.cwd(), 'core', 'data')
export const MODELS_PATH = path.join(GLOBAL_DATA_PATH, 'models')
export const VOICE_CONFIG_PATH = path.join(
  process.cwd(),
  'core',
  'config',
  'voice'
)
export const SERVER_PATH = path.join(
  process.cwd(),
  'server',
  IS_PRODUCTION_ENV ? 'dist' : 'src'
)
export const TMP_PATH = path.join(SERVER_PATH, 'tmp')
export const LEON_FILE_PATH = path.join(process.cwd(), 'leon.json')

/**
 * LLMs
 * @see k-quants comparison: https://github.com/ggerganov/llama.cpp/pull/1684
 */
export const HAS_LLM = process.env['LEON_LLM'] === 'true'
export const HAS_LLM_NLG = process.env['LEON_LLM_NLG'] === 'true' && HAS_LLM
export const LLM_PROVIDER = process.env['LEON_LLM_PROVIDER']
// export const LLM_VERSION = 'v0.2.Q4_K_S'
// export const LLM_VERSION = '8B-Instruct.Q5_K_S'
// export const LLM_VERSION = '2.9-llama3-8b.Q5_K_S'
export const LLM_VERSION = '3-8B-Uncensored-Q5_K_S'
// export const LLM_VERSION = '3-mini-128k-instruct.Q5_K_S'
// export const LLM_VERSION = '3-mini-4k-instruct-q4'
// export const LLM_VERSION = '1.1-7b-it-Q4_K_M'
// export const LLM_VERSION = '8B-Instruct-Q4_K_S'
// export const LLM_NAME = 'Mistral 7B Instruct'
// export const LLM_NAME = 'Meta-Llama-3-8B-Instruct'
// export const LLM_NAME = 'Dolphin 2.9 Llama-3-8B'
export const LLM_NAME = 'Lexi-Llama-3-8B-Uncensored'
// export const LLM_NAME = 'Phi-3-Mini-128K-Instruct'
// export const LLM_NAME = 'Phi-3-mini'
// export const LLM_NAME = 'Gemma 1.1 7B (IT)'
// export const LLM_NAME = 'Meta Llama 3 8B Instruct'
// export const LLM_FILE_NAME = `mistral-7b-instruct-${LLM_VERSION}.gguf`
// export const LLM_FILE_NAME = `Meta-Llama-3-${LLM_VERSION}.gguf`
// export const LLM_FILE_NAME = `dolphin-${LLM_VERSION}.gguf`
export const LLM_FILE_NAME = `Lexi-Llama-${LLM_VERSION}.gguf`
// export const LLM_FILE_NAME = `Phi-${LLM_VERSION}.gguf`
// export const LLM_FILE_NAME = `gemma-${LLM_VERSION}.gguf`
// export const LLM_FILE_NAME = `Meta-Llama-3-${LLM_VERSION}.gguf`
export const LLM_NAME_WITH_VERSION = `${LLM_NAME} (${LLM_VERSION})`
export const LLM_DIR_PATH = path.join(MODELS_PATH, 'llm')
export const LLM_PATH = path.join(LLM_DIR_PATH, LLM_FILE_NAME)
export const LLM_MINIMUM_TOTAL_RAM = 8
export const LLM_MINIMUM_FREE_RAM = 8
/*export const LLM_HF_DOWNLOAD_URL =
  'https://huggingface.co/QuantFactory/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/Meta-Llama-3-8B-Instruct.Q5_K_S.gguf?download=true'*/
/*export const LLM_HF_DOWNLOAD_URL =
  'https://huggingface.co/QuantFactory/dolphin-2.9-llama3-8b-GGUF/resolve/main/dolphin-2.9-llama3-8b.Q5_K_S.gguf?download=true'*/
export const LLM_HF_DOWNLOAD_URL =
  'https://huggingface.co/bartowski/Lexi-Llama-3-8B-Uncensored-GGUF/resolve/main/Lexi-Llama-3-8B-Uncensored-Q5_K_S.gguf?download=true'
/*export const LLM_HF_DOWNLOAD_URL =
  'https://huggingface.co/PrunaAI/Phi-3-mini-128k-instruct-GGUF-Imatrix-smashed/resolve/main/Phi-3-mini-128k-instruct.Q5_K_S.gguf?download=true'*/
/*export const LLM_HF_DOWNLOAD_URL =
  'https://huggingface.co/microsoft/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi-3-mini-4k-instruct-q4.gguf?download=true'*/
/*export const LLM_HF_DOWNLOAD_URL =
  'https://huggingface.co/bartowski/gemma-1.1-7b-it-GGUF/resolve/main/gemma-1.1-7b-it-Q4_K_M.gguf?download=true'*/
/*export const LLM_HF_DOWNLOAD_URL =
  'https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q4_K_S.gguf?download=true'*/
/*export const LLM_HF_DOWNLOAD_URL =
  'https://huggingface.co/bartowski/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/Meta-Llama-3-8B-Instruct-Q4_K_S.gguf?download=true'*/
/*export const LLM_MIRROR_DOWNLOAD_URL =
  'https://hf-mirror.com/bartowski/gemma-1.1-7b-it-GGUF/resolve/main/gemma-1.1-7b-it-Q4_K_M.gguf?download=true'*/
/*export const LLM_MIRROR_DOWNLOAD_URL =
  'https://hf-mirror.com/QuantFactory/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/Meta-Llama-3-8B-Instruct.Q5_K_S.gguf?download=true'*/
/*export const LLM_MIRROR_DOWNLOAD_URL =
  'https://hf-mirror.com/QuantFactory/dolphin-2.9-llama3-8b-GGUF/resolve/main/dolphin-2.9-llama3-8b.Q5_K_S.gguf?download=true'*/
export const LLM_MIRROR_DOWNLOAD_URL =
  'https://hf-mirror.com/bartowski/Lexi-Llama-3-8B-Uncensored-GGUF/resolve/main/Lexi-Llama-3-8B-Uncensored-Q5_K_S.gguf?download=true'
/*export const LLM_MIRROR_DOWNLOAD_URL =
  'https://hf-mirror.com/PrunaAI/Phi-3-mini-128k-instruct-GGUF-Imatrix-smashed/resolve/main/Phi-3-mini-128k-instruct.Q5_K_S.gguf?download=true'*/
/*export const LLM_MIRROR_DOWNLOAD_URL =
  'https://hf-mirror.com/microsoft/Phi-3-mini-4k-instruct-gguf/resolve/main/Phi-3-mini-4k-instruct-q4.gguf?download=true'*/
/*export const LLM_MIRROR_DOWNLOAD_URL =
  'https://hf-mirror.com/TheBloke/Mistral-7B-Instruct-v0.2-GGUF/resolve/main/mistral-7b-instruct-v0.2.Q4_K_S.gguf?download=true'*/
/*export const LLM_MIRROR_DOWNLOAD_URL =
  'https://hf-mirror.com/bartowski/Meta-Llama-3-8B-Instruct-GGUF/resolve/main/Meta-Llama-3-8B-Instruct-Q4_K_S.gguf?download=true'*/
/**
 * @see llama.cpp releases: https://github.com/ggerganov/llama.cpp/releases
 */
export const LLM_LLAMA_CPP_RELEASE_TAG = 'b2768'

/**
 * Misc
 */
export const MINIMUM_REQUIRED_RAM = 4
export const INSTANCE_ID = fs.existsSync(LEON_FILE_PATH)
  ? JSON.parse(fs.readFileSync(LEON_FILE_PATH, 'utf8')).instanceID
  : null
export const IS_GITHUB_ACTIONS = process.env['GITHUB_ACTIONS'] !== undefined
export const IS_GITPOD = process.env['GITPOD_WORKSPACE_URL'] !== undefined
