#TypeChain

## typescript를 이용한 블록체인 만들기

# Block Chain 생성 과정

- 블록 클래스 생성 (메소드,변수,constructor포함)
- calculateBlockHash (=crypto-js를 사용하여 해쉬키 발급)
- validateStructure (= 블록안에 있는 값들이 알맞은 Type으로 들어왔는지 확인)
- 첫번째 블록(=genesisBlock)과, 블록이 들어갈 배열(=blockchain) 선언
- 블록체인 배열안에 있는 최신 블록을 가져오기 (=getLatestBlock)
- 이전블록,인덱스,timestamp,해쉬 정보를 포함한 새로운 블록 생성(=createNewBlock)
- 새로운 블록을 만들때 해당 블록이 유효한 블록이라면, 블록체인에 추가 (= addBlock)