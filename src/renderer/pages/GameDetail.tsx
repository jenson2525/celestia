import React, { useState } from 'react';
import { GameDefinition, GameConfig } from '../../types/game';
import { GAME_ICONS } from '../assets/incons';
import SettingsPanel from '../components/SettingsPanel';

interface Props {
  game: GameDefinition;
  exePath: string;
  onConfigSave: (configs: GameConfig[]) => void;
}

const GameDetail: React.FC<Props> = ({ game, exePath, onConfigSave }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [launching, setLaunching] = useState(false);

  const handleLaunch = async () => {
    if (!exePath) {
      alert('请先在设置中配置游戏路径');
      return;
    }
    if (launching) return;
    setLaunching(true);
    try {
      await window.electronAPI.launchGame(exePath);
    } catch {
      alert('启动失败，请检查游戏路径是否正确');
    } finally {
      setTimeout(() => setLaunching(false), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* 页面头部 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '28px 32px',
        flexShrink: 0,
      }}>
        {/* 游戏名称 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={GAME_ICONS[game.id]}
            alt={game.name}
            style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }}
          />
          <span style={{ fontSize: 22, fontWeight: 700, color: '#333' }}>
            {game.name}
          </span>
        </div>

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleLaunch}
            style={{
              padding: '8px 20px',
              background: launching ? '#89b8e8' : '#4A90D9',
              color: '#fff',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              transition: 'background 0.2s',
            }}
          >
            {launching ? '启动中…' : '启动游戏'}
          </button>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              padding: '8px 16px',
              background: '#F5F7FA',
              color: '#555',
              borderRadius: 8,
              fontSize: 14,
              border: '1px solid #E8ECF0',
            }}
          >
            设置
          </button>
        </div>
      </div>

      {/* 分割线 */}
      <div style={{ height: 1, background: '#E8ECF0', flexShrink: 0 }} />

      {/* 内容区（预留：游戏资讯、账号信息等） */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
        {/* TODO: 游戏资讯、账号数据等模块 */}
      </div>

      {/* 设置面板 */}
      {showSettings && (
        <SettingsPanel
          game={game}
          exePath={exePath}
          onSave={(updatedConfigs: GameConfig[]) => {
            onConfigSave(updatedConfigs);
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}

    </div>
  );
};

export default GameDetail;