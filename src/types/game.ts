export interface GameDefinition {
  id: string;
  name: string;
  iconFile: string; // assets/icons/ 下的文件名
}

export const GAME_DEFINITIONS: GameDefinition[] = [
  { id: 'genshin',  name: '原神',        iconFile: 'genshin.png'  },
  { id: 'zzz',      name: '绝区零',      iconFile: 'zzz.png'      },
  { id: 'endfield', name: '明日方舟终末地', iconFile: 'endfield.png' },
];

// 用户配置，仅存储每款游戏的可执行文件路径
export interface GameConfig {
  id: string;
  exePath: string;
}