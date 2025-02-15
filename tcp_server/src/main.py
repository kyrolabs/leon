import os
from os.path import join, dirname
from dotenv import load_dotenv

import lib.nlp as nlp
from lib.tcp_server import TCPServer

dotenv_path = join(dirname(__file__), '../../../../../.env')
load_dotenv(dotenv_path)

nlp.load_spacy_model()

tcp_server_host = os.environ.get('LEON_PY_TCP_SERVER_HOST', '0.0.0.0')
tcp_server_port = os.environ.get('LEON_PY_TCP_SERVER_PORT', 1342)

tcp_server = TCPServer(tcp_server_host, tcp_server_port)
tcp_server.init_asr()
tcp_server.init_tts()
tcp_server.init()
