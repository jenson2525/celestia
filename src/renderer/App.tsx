import React from 'react';
import './styles/global.css';
import GameList from './pages/GameList';

const App: React.FC = () => {
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

        {/* 导航项 */}
        <nav>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 20px',
            borderRadius: 8,
            margin: '0 8px',
            background: '#E8F0FD',
            color: '#4A90D9',
            fontWeight: 500,
            fontSize: 14,
          }}>
            <span>🎮</span>
            <span>游戏库</span>
          </div>
        </nav>
      </aside>

      {/* 主内容区 */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <GameList />
      </main>

    </div>
  );
};

export default App;