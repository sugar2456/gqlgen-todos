
type User = {
  id: number | string;
  name: string;
};

interface UserListProps {
  users: User[];
}

export function UserList({ users }: UserListProps) {
  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-6">ユーザ一覧</h1>
      <div className="space-y-4 max-w-3xl mx-auto">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-5 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 dark:text-blue-300 text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{user.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">ユーザーID: {user.id}</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 flex-shrink-0">
                詳細
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}