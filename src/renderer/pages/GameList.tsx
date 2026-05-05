import React, { useEffect, useState } from 'react';
import { Game } from '../../types/game';
import GameCard from '../components/GameCard';
import GameFormModal from '../components/GameFormModal';

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchGames = async () => {
    const result = await window.electronAPI.getGames();
    setGames(result);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleAdd = () => {
    setEditingGame(null);
    setShowModal(true);
  };

  const handleEdit = (game: Game) => {
    setEditingGame(game);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('确认删除该游戏？')) return;
    const result = await window.electronAPI.deleteGame(id);
    setGames(result);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingGame(null);
  };

  const handleModalSave = (updatedGames: Game[]) => {
    setGames(updatedGames);
    handleModalClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* 页面头部 */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '32px 32px 24px',
        borderBottom: '1px solid #E8ECF0',
        flexShrink: 0,
      }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
            🎮 游戏库
          </h1>
          <p style={{ fontSize: 13, color: '#888' }}>
            管理你的游戏，一键直接启动
          </p>
        </div>
        <button
          onClick={handleAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            background: '#4A90D9',
            color: '#fff',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          + 添加游戏
        </button>
      </div>

      {/* 游戏卡片区域 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
        {games.length === 0 ? (
          /* 空状态引导 */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 16,
            color: '#aaa',
          }}>
            <span style={{ fontSize: 48 }}>🎮</span>
            <p style={{ fontSize: 15 }}>还没有添加任何游戏</p>
            <button
              onClick={handleAdd}
              style={{
                padding: '8px 20px',
                background: '#4A90D9',
                color: '#fff',
                borderRadius: 8,
                fontSize: 14,
              }}
            >
              添加第一款游戏
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 20,
          }}>
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* 添加/编辑弹窗 */}
      {showModal && (
        <GameFormModal
          game={editingGame}
          onSave={handleModalSave}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default GameList;