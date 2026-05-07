import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang, type TKey } from "./i18n";
import iphone from "@/assets/iphone.jpg";
import airpods from "@/assets/airpods.jpg";
import macbook from "@/assets/macbook.jpg";
import caseImg from "@/assets/case.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: string;
};

export type User = {
  username: string;
  password: string;
  name: string;
  phone: string;
  isAdmin: boolean;
};

const defaultProducts: Product[] = [
  { id: "1", name: "iPhone 15 Pro Max", price: 1599, description: "Titan korpus, A17 Pro chip, 256GB", image: iphone, stock: 12, category: "iPhone" },
  { id: "2", name: "AirPods Pro 2", price: 249, description: "Active Noise Cancellation, USB-C", image: airpods, stock: 3, category: "AirPods" },
  { id: "3", name: 'MacBook Pro 14"', price: 2499, description: "M3 Pro, 18GB RAM, 512GB SSD", image: macbook, stock: 0, category: "MacBook" },
  { id: "4", name: "Leather Case", price: 59, description: "Premium leather case for iPhone", image: caseImg, stock: 28, category: "Aksessuar" },
  { id: "5", name: "iPhone 14", price: 899, description: "A15 Bionic, 128GB, dual camera", image: iphone, stock: 7, category: "iPhone" },
  { id: "6", name: "AirPods Max", price: 549, description: "Hi-Fi audio, premium materials", image: airpods, stock: 2, category: "AirPods" },
];

const defaultUsers: User[] = [
  { username: "admin", password: "admin123", name: "Administrator", phone: "+998901234567", isAdmin: true },
];

type Store = {
  lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string;
  theme: "light" | "dark"; toggleTheme: () => void;
  isAuth: boolean; 
  currentUser: User | null;
  login: (u: string, p: string) => User | null; 
  register: (u: User) => boolean;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  removeProduct: (id: string) => void;
};

const Ctx = createContext<Store | null>(null);

function useLS<T>(key: string, init: T): [T, (v: T) => void] {
  const [v, setV] = useState<T>(() => {
    if (typeof window === "undefined") return init;
    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : init; } catch { return init; }
  });
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(v)); }, [key, v]);
  return [v, setV];
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLS<Lang>("am_lang", "uz");
  const [theme, setTheme] = useLS<"light" | "dark">("am_theme", "light");
  const [isAuth, setIsAuth] = useLS<boolean>("am_auth", false);
  const [currentUser, setCurrentUser] = useLS<User | null>("am_current_user", null);
  const [users, setUsers] = useLS<User[]>("am_users", defaultUsers);
  const [products, setProducts] = useLS<Product[]>("am_products", defaultProducts);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const t = (k: TKey) => translations[lang][k] || k;

  const login = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsAuth(true);
      setCurrentUser(user);
      return user;
    }
    return null;
  };

  const register = (newUser: User) => {
    const exists = users.find(u => u.username === newUser.username);
    if (exists) {
      return false;
    }
    setUsers([...users, newUser]);
    setIsAuth(true);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setIsAuth(false);
    setCurrentUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!currentUser) return;
    
    const updatedUser = { ...currentUser, ...updates };
    
    // Update in users list
    const updatedUsers = users.map(u => 
      u.username === currentUser.username ? updatedUser : u
    );
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
  };

  return (
    <Ctx.Provider value={{
      lang, setLang, t,
      theme, toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
      isAuth, currentUser, login, register, updateUser, logout,
      products,
      addProduct: (p) => setProducts([...products, { ...p, id: Date.now().toString() }]),
      updateProduct: (id, p) => setProducts(products.map(x => x.id === id ? { ...x, ...p } : x)),
      removeProduct: (id) => setProducts(products.filter(x => x.id !== id)),
    }}>{children}</Ctx.Provider>
  );
}

export const useStore = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("StoreProvider missing");
  return c;
};
