import { useAuth } from "../../../hook/auth";

export function MenuAvatar({open}:{open:boolean}){
    const {signOut, user} = useAuth();
    return(
        <div className={`fixed top-10 right-0 ${open?'block': 'hidden'} z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}>
            <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                    {user?.nome}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    {user?.email}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    {user?.ru}
                </p>
                {user?.cro &&
                    (
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                            {user?.ru}
                        </p>
                    )
                }
            </div>
            <ul className="py-1" role="none">
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                </li>
                <li>
                    <button onClick={signOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                        Sign out
                    </button>
                </li>
            </ul>
        </div>
    )
}