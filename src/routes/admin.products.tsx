import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useStore, type Product } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Package, AlertTriangle, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin/products")({ component: ProductsPage });

function ProductsPage() {
  const { t, products, addProduct, updateProduct, removeProduct } = useStore();
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const stats = [
    { i: Package, l: t("total_products"), v: products.length, c: "text-accent" },
    { i: AlertTriangle, l: t("low_stock"), v: products.filter(p => p.stock > 0 && p.stock < 5).length, c: "text-amber-500" },
    { i: XCircle, l: t("out_of_stock"), v: products.filter(p => p.stock === 0).length, c: "text-destructive" },
  ];

  return (
    <>
      <AdminHeader title={t("products_section")} />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <Card key={i} className="p-6 shadow-card flex items-center gap-4">
              <div className={`h-12 w-12 grid place-items-center rounded-xl bg-secondary ${s.c}`}>
                <s.i className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Dialog open={adding} onOpenChange={setAdding}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-accent text-accent-foreground"><Plus className="h-4 w-4 mr-2" />{t("add_product")}</Button>
            </DialogTrigger>
            <ProductFormDialog
              title={t("new_product")}
              onSubmit={(p) => { addProduct(p); setAdding(false); toast.success(t("success_added")); }}
            />
          </Dialog>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => (
            <Card key={p.id} className="overflow-hidden shadow-card hover:shadow-elegant transition-all p-0">
              <div className="aspect-square bg-secondary"><img src={p.image} alt={p.name} className="h-full w-full object-cover" /></div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground">{p.category}</div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg font-bold">${p.price}</span>
                    <span className={`text-xs ${p.stock === 0 ? "text-destructive" : p.stock < 5 ? "text-amber-500" : "text-muted-foreground"}`}>
                      {t("stock")}: {p.stock}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => setEditing(p)}>
                    <Pencil className="h-3 w-3 mr-1" />{t("edit")}
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1" onClick={() => setDeleting(p.id)}>
                    <Trash2 className="h-3 w-3 mr-1" />{t("delete")}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
          {editing && (
            <ProductFormDialog
              title={t("edit_product")}
              initial={editing}
              editMode
              onSubmit={(p) => { updateProduct(editing.id, p); setEditing(null); toast.success(t("success_updated")); }}
            />
          )}
        </Dialog>

        <AlertDialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("confirm_delete")}</AlertDialogTitle>
              <AlertDialogDescription>{t("confirm_delete_sub")}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => { if (deleting) { removeProduct(deleting); toast.success(t("success_deleted")); setDeleting(null); } }}
              >{t("confirm")}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </>
  );
}

function ProductFormDialog({
  title, initial, onSubmit, editMode,
}: {
  title: string;
  initial?: Product;
  editMode?: boolean;
  onSubmit: (p: Omit<Product, "id">) => void;
}) {
  const { t } = useStore();
  const [name, setName] = useState(initial?.name ?? "");
  const [price, setPrice] = useState(initial?.price?.toString() ?? "");
  const [desc, setDesc] = useState(initial?.description ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [stock, setStock] = useState(initial?.stock?.toString() ?? "10");
  const [category, setCategory] = useState(initial?.category ?? "iPhone");

  const handleFile = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(r.result as string);
    r.readAsDataURL(f);
  };

  const submit = () => {
    if (!name.trim() || !price.trim() || (!editMode && !image)) {
      toast.error(t("fill_all")); return;
    }
    onSubmit({
      name, price: parseFloat(price) || 0,
      description: desc, image: image || initial?.image || "",
      stock: parseInt(stock) || 0, category,
    });
  };

  return (
    <DialogContent className="max-w-lg">
      <DialogHeader><DialogTitle>{title}</DialogTitle></DialogHeader>
      <div className="space-y-4">
        <div>
          <Label>{t("image")} *</Label>
          {image && <img src={image} alt="" className="mt-2 h-32 w-32 object-cover rounded-lg" />}
          <Input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} className="mt-1.5" />
        </div>
        <div><Label>{t("name")} *</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>{t("price")} *</Label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1.5" /></div>
          <div><Label>{t("stock")}</Label><Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="mt-1.5" /></div>
        </div>
        <div><Label>Category</Label><Input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1.5" /></div>
        <div><Label>{t("description_opt")}</Label><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="mt-1.5" /></div>
        <Button className="w-full bg-gradient-accent text-accent-foreground" onClick={submit}>
          {editMode ? t("save") : t("submit")}
        </Button>
      </div>
    </DialogContent>
  );
}
