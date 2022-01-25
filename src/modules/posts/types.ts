export interface Post {
  id?: string // Post의 식별값
  author: string // 작성자
  series: string | null // 시리즈 식별값
  type: 'series' | 'article' // 시리즈,article 인지 정함
  title: string // 제목
  desc: string // 요약 (PostItem에서 보이는것)
  body: string // 내용
  thumnailURL: string
  thumnailPath: string
  files?: UploadFile[]
  tags?: string[] // tags
  images?: string[] // 글 작성시 upload된 이미지들을 저장한다.

  createAt?: Date // 작성일자
  updateAt?: Date // 수정일자
}

interface UploadFile {
  url: string
  filePath: string
}

const IMAGE_TYPE = ['image/png', 'image/jpeg']

export { IMAGE_TYPE, UploadFile }
