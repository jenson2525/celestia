export interface Game {
  id: string;  // 唯一标识，创建时用时间戳生成
  name: string;  // 游戏名称
  exePath: string;  // 游戏可执行文件的绝对路径
  coverImage?: string;  // 封面图片路径，可选
  createdAt: number;  // 添加时间戳，用于列表排序
}