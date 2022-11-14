import socket
from json import *
from collections import deque
import argparse
from datetime import *


class Dataconverter:
        def __init__(self) -> None:
             self.que = deque()         #Using List as Que becaus we need FiFo
             self.conv_list = []

        def store_que(self,data,timestamp):
            self.que.append(data)
            self.conversion(timestamp)
        def conversion(self,timestamp):
                json_object = dict(loads(self.que.popleft()))
                meas_data = {
                        "data": {
                                "measurement": "machinedata",
                                "tags": {
                                        "serialnumber": 0
                                },
                                "values": [{
                                        "ts": "2022-09-23T13:32:34.119Z",
                                        "uptime": 4,
                                        "temp": 40.3,
                                        "cycle": 123123            
                                }]
                            }
                        }
                meas_data['data']['tags']['serialnumber'] = json_object['data'][0]
                meas_data['data']['values'][0]['temp'] = json_object['data'][6]
                meas_data['data']['values'][0]['uptime'] = json_object['data'][7]
                meas_data['data']['values'][0]['cycle'] = json_object['data'][8]
                meas_data['data']['values'][0]['ts'] = str(timestamp)
                self.conv_list.append(meas_data)
                for i in range(len(self.conv_list)):
                    print(str(self.conv_list[i])+"\n")


            


class Tcpsocket:
    def __init__(self,ip='127.0.0.1',port=7002) -> None:
        self.HOST = ip
        self.PORT = port
    def connect(self,Dc: Dataconverter)->None:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:    #Creates socket-object with alias s
            s.bind((self.HOST, self.PORT))                                        #Binds the socket-object to the Ip and Port defined above
            s.listen()                                                  #The socket-object will listen to the Port and Ip-Adress
            conn, addr = s.accept()                                     #conn is the socket-object that got send by the client
            with conn:                                                  
                print(f"Connected by {addr}")                           
                while True:
                    data = conn.recv(1024)                             #data is the JSON object that got send 
                    dt = datetime.now()
                    ts = str(dt.isoformat('T'))
                    tu = ts[:len(str(ts))-3]+'Z'
                    Dc.store_que(data,tu)
                    if not data:
                        break
                    conn.sendall(data)


if __name__ == '__main__':
    Sock = Tcpsocket()
    Dc = Dataconverter()
    Sock.connect(Dc)
