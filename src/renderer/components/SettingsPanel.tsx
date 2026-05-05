import React, { useState } from 'react';
import { GameDefinition, GameConfig } from '../../types/game';

interface Props {
  game: GameDefinition;
  exePath: string;
  onSave: (configs: GameConfig[]) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<Props> = ({ game, exePath, onSave, onClose }) => {
  const [currentPath, setCurrentPath] = useState(exePath);

  const handleSelectExe = async () => {
    const path = await window.electronAPI.selectExeFile();
    if (path) setCurrentPath(path);
  };

  const handleSave = async () => {
    const result = await window.electronAPI.saveConfig(game.id, currentPath);
    onSave(result);
  };

  return (
    // 遮罩层
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      {/* 面板主体，阻止点击事件冒泡到遮罩层 */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 16,
          width: 480,
          boxShadow: '0 16px 48px rgba(0,0,0,0.16)',
          overflow: 'hidden',
        }}
      >
        {/* 面板标题 */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid #E8ECF0',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#333' }}>
            {game.name} · 设置
          </h2>
        </div>

        {/* 设置项列表（预留扩展区域） */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* 设置项：游戏路径 */}
          <div>
            <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>
              游戏路径
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={currentPath}
                readOnly
                placeholder="请选择游戏 .exe 文件"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 8,
                  fontSize: 13,
                  background: '#FAFAFA',
                  color: '#555',
                }}
              />
              <button
                onClick={handleSelectExe}
                style={{
                  padding: '8px 14px',
                  background: '#F0F4FF',
                  color: '#4A90D9',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  border: '1px solid #D0E0F8',
                  flexShrink: 0,
                }}
              >
                浏览
              </button>
            </div>
          </div>

          {/* 未来新增设置项在此处追加 */}

        </div>

        {/* 操作按钮 */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 10,
          padding: '16px 28px',
          borderTop: '1px solid #E8ECF0',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: '1px solid #E0E0E0',
              color: '#555',
              fontSize: 14,
            }}
          >
            取消
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              background: '#4A90D9',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;