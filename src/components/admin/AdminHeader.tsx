import { useState } from "react";
import { useStore, type User } from "@/lib/store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sun, Moon, Pencil } from "lucide-react";

export function AdminHeader({ title }: { title: string }) {
  const { currentUser, theme, toggleTheme, updateUser } = useStore();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({
    name: currentUser?.name || "",
    username: currentUser?.username || "",
    password: "",
    phone: currentUser?.phone || "",
  });

  const handleSave = () => {
    const updates: Partial<User> = {
      name: editData.name,
      username: editData.username,
      phone: editData.phone,
    };
    
    // Only update password if it's not empty
    if (editData.password && editData.password.trim() !== "") {
      updates.password = editData.password;
    }
    
    updateUser(updates);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 glass border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8"><AvatarFallback className="bg-gradient-accent text-white">A</AvatarFallback></Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="font-semibold">{currentUser?.name}</div>
                <div className="text-xs text-muted-foreground font-normal">{currentUser?.phone}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => { 
                setEditData({
                  name: currentUser?.name || "",
                  username: currentUser?.username || "",
                  password: "",
                  phone: currentUser?.phone || "",
                });
                setOpen(true); 
              }}>
                <Pencil className="h-4 w-4 mr-2" /> Ma'lumotlarni tahrirlash
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin ma'lumotlarini tahrirlash</DialogTitle>
            <DialogDescription>
              Login, parol va boshqa ma'lumotlarni o'zgartiring
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Ism</Label>
              <Input 
                value={editData.name} 
                onChange={(e) => setEditData({ ...editData, name: e.target.value })} 
                className="mt-1.5" 
              />
            </div>
            <div>
              <Label>Login</Label>
              <Input 
                value={editData.username} 
                onChange={(e) => setEditData({ ...editData, username: e.target.value })} 
                className="mt-1.5" 
              />
            </div>
            <div>
              <Label>Yangi parol (bo'sh qoldiring o'zgartirmaslik uchun)</Label>
              <Input 
                type="password"
                value={editData.password} 
                onChange={(e) => setEditData({ ...editData, password: e.target.value })} 
                placeholder="Yangi parol"
                className="mt-1.5" 
              />
            </div>
            <div>
              <Label>Telefon raqam</Label>
              <Input 
                value={editData.phone} 
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })} 
                className="mt-1.5" 
              />
            </div>
            <Button 
              className="w-full bg-gradient-accent text-accent-foreground" 
              onClick={handleSave}
            >
              Saqlash
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
