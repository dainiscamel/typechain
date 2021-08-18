import * as CryptoJS from "crypto-js";

class Block {
  // Hash 생성  메소드 
  // static ? 클래스가 생성되지 않아도 호출하기 위해 사용
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  // 블록 구조 인증을 위한 메소드로 블록안에 들어갈 값들이 알맞을 타입인지 확인한다.
  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

// 첫번째 블록과 블록에 들어갈 배열 선언.
const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;
// 가장 나중(=최근)에 만들어진 블럭 
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );

  //createNewBlock에 addBlock 연결 (= 새로운 블록을 만들때 블록이 유효하다면 블록체인에 추가.)
  addBlock(newBlock);
  return newBlock;
};

// 블록 하나 당 해쉬 키 발급.
const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  // 현재 블록이 유효한지 체크
  if (!Block.validateStructure(candidateBlock)) {
    return false;
    // 이전 블록의 인덱스 +1 와 현재 블록의 인덱스가 같은지 체크.
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
    // 이전 블록의 해쉬와 현재블록의 previousHash 가 같은지 체크.
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
    // 현재 블록이 getHashforBlock를 통해 얻은 해쉬값과 현재 블록이 가지고 있는 해쉬 값이 같은지 체크.
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  // 블록이 유효하다면
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    // 블록체인에 연결
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};