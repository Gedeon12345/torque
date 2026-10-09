import { useState } from "react";
import Button from "@/components/ui/Button";
import SelectField from "@/components/ui/SelectField";
import TextField from "@/components/ui/TextField";
import { useCategories } from "@/hooks/useCategories";
import { ApiRequestError } from "@/utils/apiClient";

const BADGE_OPTIONS = [
  { value: "", label: "Aucun badge" },
  { value: "Nouveau", label: "Nouveau" },
  { value: "Promo", label: "Promo" },
];

/** Le formulaire travaille en euros à l'affichage ; la conversion en centimes se fait à l'envoi (voir toPayload). */
function toFormValues(product) {
  if (!product) {
    return { reference: "", name: "", brand: "", category: "", description: "", imageUrl: "", imageAlt: "",
      price: "", oldPrice: "", stockQuantity: "0", badge: "", compatibility: "", compatibleBrands: "" };
  }
  return {
    reference: product.reference, name: product.name, brand: product.brand, category: product.category,
    description: product.description ?? "", imageUrl: product.imageUrl, imageAlt: product.imageAlt,
    price: (product.priceCents / 100).toString(),
    oldPrice: product.oldPriceCents ? (product.oldPriceCents / 100).toString() : "",
    stockQuantity: String(product.stockQuantity ?? 0),
    badge: product.badge ?? "",
    compatibility: (product.compatibility ?? []).join(", "),
    compatibleBrands: (product.compatibleBrands ?? []).join(", "),
  };
}

const toCents = (euros) => Math.round(Number(euros.replace(",", ".")) * 100);
const splitList = (text) => text.split(",").map((item) => item.trim()).filter(Boolean);

function toPayload(values) {
  return {
    reference: values.reference.trim(),
    name: values.name.trim(),
    brand: values.brand.trim(),
    category: values.category,
    description: values.description.trim() || undefined,
    imageUrl: values.imageUrl.trim(),
    imageAlt: values.imageAlt.trim(),
    priceCents: toCents(values.price),
    oldPriceCents: values.oldPrice ? toCents(values.oldPrice) : null,
    stockQuantity: Number(values.stockQuantity),
    badge: values.badge || null,
    compatibility: splitList(values.compatibility),
    compatibleBrands: splitList(values.compatibleBrands),
  };
}

/** Utilisé pour créer un produit (product=null) ou le modifier (product fourni). */
export default function ProductForm({ product, onSubmit, submitLabel }) {
  const { categories } = useCategories();
  const [values, setValues] = useState(() => toFormValues(product));
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (field) => (event) => setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(toPayload(values));
    } catch (err) {
      if (err instanceof ApiRequestError) {
        const details = err.details?.map((d) => d.message).join(" ");
        setError(details ? `${err.message} : ${details}` : err.message);
      } else {
        setError("Une erreur est survenue.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="pf-reference" label="Référence" required value={values.reference} onChange={set("reference")} />
        <TextField id="pf-brand" label="Marque" required value={values.brand} onChange={set("brand")} />
      </div>
      <TextField id="pf-name" label="Nom du produit" required value={values.name} onChange={set("name")} />

      <SelectField id="pf-category" label="Catégorie" required value={values.category} onChange={(v) => setValues({ ...values, category: v })}
        options={categories.map((c) => ({ value: c.slug, label: c.name }))} />

      <div>
        <label htmlFor="pf-description" className="mb-1.5 block text-[13px] font-semibold text-ink-2">Description</label>
        <textarea id="pf-description" rows={3} value={values.description} onChange={set("description")}
          className="w-full rounded-[10px] border border-line-strong bg-bg px-3.5 py-2.5 text-ink outline-none focus:border-ink" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="pf-image-url" label="Chemin de la photo (ex. /products/nom.jpg)" required value={values.imageUrl} onChange={set("imageUrl")} />
        <TextField id="pf-image-alt" label="Texte alternatif de l'image" required value={values.imageAlt} onChange={set("imageAlt")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <TextField id="pf-price" label="Prix (€)" required inputMode="decimal" value={values.price} onChange={set("price")} />
        <TextField id="pf-oldprice" label="Ancien prix (€, facultatif)" inputMode="decimal" value={values.oldPrice} onChange={set("oldPrice")} />
        <TextField id="pf-stock" label="Stock" type="number" min="0" required value={values.stockQuantity} onChange={set("stockQuantity")} />
      </div>

      <SelectField id="pf-badge" label="Badge" value={values.badge} onChange={(v) => setValues({ ...values, badge: v })} options={BADGE_OPTIONS} placeholder={null} />

      <TextField id="pf-compat" label="Compatibilité (séparée par des virgules)" value={values.compatibility} onChange={set("compatibility")} />
      <TextField id="pf-compat-brands" label="Marques de véhicules compatibles (séparées par des virgules, * = universel)" value={values.compatibleBrands} onChange={set("compatibleBrands")} />

      {error && <p role="alert" className="rounded-[10px] bg-accent-soft px-3.5 py-3 text-sm text-danger">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="self-start">{isSubmitting ? "Enregistrement…" : submitLabel}</Button>
    </form>
  );
}
