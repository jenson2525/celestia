import React, { useState } from 'react';
import { Game } from '../../types/game';

interface Props {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

const GameCard: React.FC<Props> = ({ game, onEdit, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const [launching, setLaunching] = useState(false);

  const handleLaunch = async () => {
    if (launching) return;
    setLaunching(true);
    try {
      await window.electronAPI.launchGame(game.exePath);
    } catch {
      alert('启动失败，请检查游戏路径是否正确');
    } finally {
      // 给用户短暂的启动反馈后恢复状态
      setTimeout(() => setLaunching(false), 2000);
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        background: '#fff',
        boxShadow: hovered
          ? '0 8px 24px rgba(0,0,0,0.12)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
    >
      {/* 封面区域 */}
      <div
        onClick={handleLaunch}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3 / 4',
          background: '#E8ECF0',
          overflow: 'hidden',
        }}
      >
        {/* 封面图或占位 */}
        {game.coverImage ? (
          <img
            src={`file://${game.coverImage}`}
            alt={game.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            color: '#aaa',
            fontWeight: 700,
          }}>
            {game.name.charAt(0)}
          </div>
        )}

        {/* 悬浮启动遮罩 */}
        {hovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            color: '#fff',
            fontWeight: 600,
            letterSpacing: 1,
          }}>
            {launching ? '启动中…' : '▶ 启动游戏'}
          </div>
        )}
      </div>

      {/* 卡片底部信息与操作 */}
      <div style={{ padding: '10px 12px' }}>
        <p style={{
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 8,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {game.name}
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => onDelete(game.id)}
            style={{
              padding: '3px 10px',
              borderRadius: 20,
              border: '1px solid #ff4d4f',
              color: '#ff4d4f',
              fontSize: 12,
            }}
          >
            删除
          </button>
          <button
            onClick={() => onEdit(game)}
            style={{
              padding: '3px 10px',
              borderRadius: 20,
              border: '1px solid #4A90D9',
              color: '#4A90D9',
              fontSize: 12,
            }}
          >
            编辑
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;