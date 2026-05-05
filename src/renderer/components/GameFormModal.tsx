import React, { useState, useEffect } from 'react';
import { Game } from '../../types/game';

interface Props {
  game: Game | null;  // null 表示新增模式，非 null 表示编辑模式
  onSave: (games: Game[]) => void;
  onClose: () => void;
}

const GameFormModal: React.FC<Props> = ({ game, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [exePath, setExePath] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [error, setError] = useState('');

  // 编辑模式下用传入的 game 数据初始化表单
  useEffect(() => {
    if (game) {
      setName(game.name);
      setExePath(game.exePath);
      setCoverImage(game.coverImage ?? '');
    }
  }, [game]);

  const handleSelectExe = async () => {
    const path = await window.electronAPI.selectExeFile();
    if (path) setExePath(path);
  };

  const handleSelectImage = async () => {
    const path = await window.electronAPI.selectImageFile();
    if (path) setCoverImage(path);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('请输入游戏名称');
      return;
    }
    if (!exePath.trim()) {
      setError('请选择游戏可执行文件');
      return;
    }

    const payload: Game = {
      id: game?.id ?? '',
      name: name.trim(),
      exePath: exePath.trim(),
      coverImage: coverImage.trim() || undefined,
      createdAt: game?.createdAt ?? Date.now(),
    };

    const result = await window.electronAPI.saveGame(payload);
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
      {/* 弹窗主体，阻止点击事件冒泡到遮罩层 */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: 32,
          width: 480,
          boxShadow: '0 16px 48px rgba(0,0,0,0.16)',
        }}
      >
        {/* 弹窗标题 */}
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>
          {game ? '编辑游戏' : '添加游戏'}
        </h2>

        {/* 游戏名称 */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>
            游戏名称
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：原神"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #E0E0E0',
              borderRadius: 8,
              fontSize: 14,
              outline: 'none',
            }}
          />
        </div>

        {/* 可执行文件路径 */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>
            游戏路径
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={exePath}
              readOnly
              placeholder="请选择游戏 .exe 文件"
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #E0E0E0',
                borderRadius: 8,
                fontSize: 14,
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

        {/* 封面图片 */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>
            封面图片（可选）
          </label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              value={coverImage}
              readOnly
              placeholder="请选择封面图片"
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #E0E0E0',
                borderRadius: 8,
                fontSize: 14,
                background: '#FAFAFA',
                color: '#555',
              }}
            />
            <button
              onClick={handleSelectImage}
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
            {/* 封面预览缩略图 */}
            {coverImage && (
              <img
                src={`file://${coverImage}`}
                alt="封面预览"
                style={{
                  width: 40,
                  height: 40,
                  objectFit: 'cover',
                  borderRadius: 6,
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <p style={{ color: '#ff4d4f', fontSize: 13, marginBottom: 16 }}>
            {error}
          </p>
        )}

        {/* 操作按钮 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
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
            onClick={handleSubmit}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              background: '#4A90D9',
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {game ? '保存' : '添加'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameFormModal;