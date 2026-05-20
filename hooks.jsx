import { useState, useEffect, useRef } from 'react';

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
function UserDashboard() {
  // -------- useState: UI State --------
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  // -------- useRef: Internal Values --------
  const searchInputRef = useRef(null);      // DOM reference
  const debounceTimerRef = useRef(null);    // Debounce timer ID
  const autoRefreshRef = useRef(null);      // Auto-refresh interval ID
  const abortControllerRef = useRef(null);  // For cancelling fetch requests
  const isMountedRef = useRef(true);        // Track mount status
  
  // ============================================
  // FETCH USERS - useEffect with cleanup
  // ============================================
  useEffect(() => {
    fetchUsers();
    
    return () => {
      isMountedRef.current = false;
      // Agar koi pending request hai toh abort karo
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  
  async function fetchUsers() {
    try {
      // Purana request abort karo (race condition prevention)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        { signal: abortControllerRef.current.signal }
      );
      
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      const data = await response.json();
      
      // Component abhi mounted hai? Tab hi state update karo
      if (isMountedRef.current) {
        setUsers(data);
        setFilteredUsers(data);
      }
    } catch (err) {
      if (err.name !== 'AbortError' && isMountedRef.current) {
        setError(err.message);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }
  
  // ============================================
  // DEBOUNCED SEARCH - useEffect + useRef
  // ============================================
  useEffect(() => {
    // Clear previous timer (debounce logic)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Agar search empty hai toh sabhi users dikhao
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    // 300ms wait karo typing ke baad (debounce)
    debounceTimerRef.current = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }, 300);
    
    // Cleanup: component unmount ya query change pe timer clear
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, users]);
  
  // ============================================
  // AUTO-REFRESH TOGGLE - useEffect + useRef
  // ============================================
  useEffect(() => {
    if (autoRefresh) {
      // Har 30 seconds mein data refresh
      autoRefreshRef.current = setInterval(() => {
        fetchUsers();
      }, 30000);
    } else {
      // Auto-refresh band karo
      if (autoRefreshRef.current) {
        clearInterval(autoRefreshRef.current);
        autoRefreshRef.current = null;
      }
    }
    
    // Cleanup on unmount or toggle
    return () => {
      if (autoRefreshRef.current) {
        clearInterval(autoRefreshRef.current);
      }
    };
  }, [autoRefresh]);
  
  // ============================================
  // KEYBOARD SHORTCUT - useEffect + useRef (DOM)
  // ============================================
  useEffect(() => {
    function handleKeyDown(event) {
      // Ctrl+K ya Cmd+K press pe search focus
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      // Escape pe modal band karo
      if (event.key === 'Escape') {
        setSelectedUser(null);
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // ============================================
  // RENDER
  // ============================================
  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2>Something went wrong!</h2>
        <p>{error}</p>
        <button onClick={fetchUsers} style={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>User Dashboard</h1>
        <div style={styles.controls}>
          {/* Search Input - useRef for DOM focus */}
          <div style={styles.searchWrapper}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search users... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Auto Refresh Toggle */}
          <label style={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto-refresh (30s)
          </label>
          
          {/* Manual Refresh */}
          <button
            onClick={fetchUsers}
            disabled={loading}
            style={styles.refreshButton}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </header>
      
      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <span>Total: {users.length}</span>
        <span>Showing: {filteredUsers.length}</span>
        {autoRefresh && <span style={styles.liveIndicator}>● LIVE</span>}
      </div>
      
      {/* User Grid */}
      {loading && users.length === 0 ? (
        <div style={styles.loadingGrid}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} style={styles.skeletonCard} />
          ))}
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => setSelectedUser(user)}
            />
          ))}
          {filteredUsers.length === 0 && (
            <p style={styles.noResults}>
              No users found for "{searchQuery}"
            </p>
          )}
        </div>
      )}
      
      {/* User Detail Modal */}
      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

// ============================================
// USER CARD COMPONENT
// ============================================
function UserCard({ user, onClick }) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div style={styles.card} onClick={onClick}>
      <div style={styles.cardHeader}>
        <div style={styles.avatar}>
          {imageError ? (
            <span style={styles.avatarFallback}>
              {user.name.charAt(0)}
            </span>
          ) : (
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
              alt={user.name}
              style={styles.avatarImg}
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div>
          <h3 style={styles.cardName}>{user.name}</h3>
          <p style={styles.cardUsername}>@{user.username}</p>
        </div>
      </div>
      <div style={styles.cardBody}>
        <p style={styles.cardInfo}>📧 {user.email}</p>
        <p style={styles.cardInfo}>🏢 {user.company.name}</p>
        <p style={styles.cardInfo}>📍 {user.address.city}</p>
      </div>
    </div>
  );
}

// ============================================
// USER MODAL COMPONENT - useEffect + useRef
// ============================================
function UserModal({ user, onClose }) {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const modalRef = useRef(null);
  
  // Fetch user's posts when modal opens
  useEffect(() => {
    let cancelled = false;
    
    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
        );
        const data = await response.json();
        if (!cancelled) {
          setPosts(data.slice(0, 3)); // First 3 posts
        }
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        if (!cancelled) setLoadingPosts(false);
      }
    }
    
    fetchPosts();
    
    return () => { cancelled = true; };
  }, [user.id]);
  
  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  return (
    <div style={styles.modalOverlay}>
      <div ref={modalRef} style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>✕</button>
        
        <div style={styles.modalHeader}>
          <h2>{user.name}</h2>
          <p style={styles.modalSubtitle}>@{user.username}</p>
        </div>
        
        <div style={styles.modalBody}>
          <div style={styles.modalSection}>
            <h4>Contact</h4>
            <p>📧 {user.email}</p>
            <p>📞 {user.phone}</p>
            <p>🌐 {user.website}</p>
          </div>
          
          <div style={styles.modalSection}>
            <h4>Company</h4>
            <p>🏢 {user.company.name}</p>
            <p style={styles.catchPhrase}>"{user.company.catchPhrase}"</p>
          </div>
          
          <div style={styles.modalSection}>
            <h4>Recent Posts</h4>
            {loadingPosts ? (
              <p>Loading posts...</p>
            ) : (
              posts.map(post => (
                <div key={post.id} style={styles.postCard}>
                  <h5 style={styles.postTitle}>{post.title}</h5>
                  <p style={styles.postBody}>{post.body.slice(0, 100)}...</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// STYLES
// ============================================
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#1a1a2e',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    position: 'relative',
    flex: '1',
    minWidth: '250px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 36px 10px 14px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  clearButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#666',
  },
  toggleLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  refreshButton: {
    padding: '10px 20px',
    background: '#4361ee',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  statsBar: {
    display: 'flex',
    gap: '20px',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
    marginBottom: '20px',
    fontSize: '14px',
    color: '#666',
  },
  liveIndicator: {
    color: '#22c55e',
    fontWeight: '600',
    animation: 'pulse 2s infinite',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  loadingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  skeletonCard: {
    height: '180px',
    borderRadius: '12px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
  },
  card: {
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #eee',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    background: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '14px',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    overflow: 'hidden',
    background: '#4361ee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarFallback: {
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
  },
  cardName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 2px 0',
  },
  cardUsername: {
    fontSize: '13px',
    color: '#888',
    margin: 0,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  cardInfo: {
    fontSize: '13px',
    color: '#555',
    margin: 0,
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#888',
    padding: '40px',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  retryButton: {
    padding: '10px 24px',
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '12px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666',
  },
  modalHeader: {
    marginBottom: '24px',
  },
  modalSubtitle: {
    color: '#888',
    margin: '4px 0 0',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  modalSection: {
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '16px',
  },
  catchPhrase: {
    fontStyle: 'italic',
    color: '#666',
  },
  postCard: {
    background: '#f8f9fa',
    padding: '12px',
    borderRadius: '8px',
    marginTop: '8px',
  },
  postTitle: {
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 6px 0',
    textTransform: 'capitalize',
  },
  postBody: {
    fontSize: '13px',
    color: '#555',
    margin: 0,
    lineHeight: '1.5',
  },
};

export default UserDashboard;