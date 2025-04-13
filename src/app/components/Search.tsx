import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserSearchType = {
  name: string;
  username: string;
  avatar: {
    url: string;
    public_id: string;
  };
  tagline: string;
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<UserSearchType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // For handling errors
  const [noUsersFound, setNoUsersFound] = useState<boolean>(false); // For no users found state

  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setLoading(true);
        setError(null); // Reset error state
        setNoUsersFound(false); // Reset no users found state

        try {
          fetch(`api/search?name=${searchTerm}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch data.");
              }
              return response.json();
            })
            .then((data) => {
              if (data.users && data.users.length === 0) {
                setNoUsersFound(true); // No users found
              } else {
                setUsers(data.users);
              }
            })
            .catch((error) => {
              setError("User not found"); // Set error message
              console.error("Error fetching data:", error);
            })
            .finally(() => {
              setLoading(false);
            });
        } catch (error) {
          console.log("Error:", error);
          setError("Something went wrong. Please try again later.");
          setLoading(false);
        }
      } else {
        // Clear everything when input is empty
        setUsers([]);
        setError(null);
        setNoUsersFound(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = (username: string) => {
    router.push(`/user/${username}`);
  };

  return (
    <div className="relative flex items-center justify-center mt-2 w-1/2 md:w-1/3">
      <input
        type="text"
        placeholder="🔍 Search your creator..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Dropdown Menu */}
      {loading && (
        <div className="absolute top-full left-0 w-full mt-2 p-2 text-center">
          Loading...
        </div>
      )}
      {noUsersFound && !loading && (
        <div className="absolute top-full left-0 w-full mt-2 p-2 text-center text-gray-500">
          No users found.
        </div>
      )}
      {error && !loading && (
        <div className="absolute top-full left-0 w-full mt-2 p-2 text-center text-red-500">
          {error}
        </div>
      )}
      {/* User Results */}
      {users.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user?.username}
              onClick={() => handleUserClick(user?.username)}
              className="flex items-center gap-x-4 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={user?.avatar?.url || ""}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <p className="text-gray-500">@{user?.username}</p>
                <p className="text-gray-400">{user?.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
