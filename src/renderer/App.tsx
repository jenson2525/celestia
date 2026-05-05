import React, { useEffect, useState } from 'react';
import './styles/global.css';
import { GAME_DEFINITIONS, GameConfig } from '../types/game';
import { GAME_ICONS } from './assets/incons';
import GameDetail from './pages/GameDetail';

const App: React.FC = () => {
  const [configs, setConfigs] = useState<GameConfig[]>([]);
  const [selectedId, setSelectedId] = useState<string>(GAME_DEFINITIONS[0].id);

  useEffect(() => {
    window.electronAPI.getConfigs().then(setConfigs);
  }, []);

  const getExePath = (id: string): string => {
    return configs.find((c) => c.id === id)?.exePath ?? '';
  };

  const handleConfigSave = (updatedConfigs: GameConfig[]) => {
    setConfigs(updatedConfigs);
  };

  const selectedGame = GAME_DEFINITIONS.find((g) => g.id === selectedId)!;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* 侧边栏 */}
      <aside style={{
        width: 200,
        background: '#F5F7FA',
        borderRight: '1px solid #E8ECF0',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0',
        flexShrink: 0,
      }}>
        {/* 应用名称 */}
        <div style={{
          padding: '0 20px 24px',
          borderBottom: '1px solid #E8ECF0',
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>
            Celestia
          </span>
        </div>

        {/* 游戏库标签 */}
        <div style={{
          padding: '10px 20px 4px',
          fontSize: 11,
          color: '#aaa',
          fontWeight: 600,
          letterSpacing: 1,
        }}>
          游戏库
        </div>

        {/* 游戏列表 */}
        <nav>
          {GAME_DEFINITIONS.map((game) => {
            const isActive = game.id === selectedId;
            return (
              <div
                key={game.id}
                onClick={() => setSelectedId(game.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 20px',
                  borderRadius: 8,
                  margin: '2px 8px',
                  background: isActive ? '#E8F0FD' : 'transparent',
                  color: isActive ? '#4A90D9' : '#444',
                  fontWeight: isActive ? 500 : 400,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
              >
                <img
                  src={GAME_ICONS[game.id]}
                  alt={game.name}
                  style={{ width: 20, height: 20, borderRadius: 4, objectFit: 'cover' }}
                />
                <span>{game.name}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* 主内容区 */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <GameDetail
          game={selectedGame}
          exePath={getExePath(selectedGame.id)}
          onConfigSave={handleConfigSave}
        />
      </main>

    </div>
  );
};

export default App;