import { useState } from "react";
import { Search } from "lucide-react";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import SelectField from "@/components/ui/SelectField";
import { vehicleCatalog, vehicleEngines, vehicleYears } from "@/data/vehicles";

const EMPTY_SELECTION = { brand: "", model: "", year: "", engine: "" };

/** Recherche par véhicule : purement visuelle pour le moment (données mockées). */
export default function VehicleFinder() {
  const [selection, setSelection] = useState(EMPTY_SELECTION);
  const [feedback, setFeedback] = useState(null);

  const models = selection.brand ? vehicleCatalog[selection.brand] : [];
  const hasModel = Boolean(selection.model);

  const update = (field, value) => {
    setFeedback(null);
    setSelection((current) => {
      if (field === "brand") return { ...EMPTY_SELECTION, brand: value };
      if (field === "model") return { ...current, model: value, year: "", engine: "" };
      return { ...current, [field]: value };
    });
  };

  const handleSearch = () => {
    if (!selection.brand || !selection.model) {
      setFeedback({ isError: true, text: "Choisissez au moins une marque et un modèle." });
      return;
    }
    const label = Object.values(selection).filter(Boolean).join(" · ");
    const demoCount = 18 + ((selection.brand.length * selection.model.length) % 40);
    setFeedback({
      isError: false,
      text: `${demoCount} pièces de démonstration compatibles avec ${label}.`,
    });
  };

  return (
    <Container as="section" className="relative z-10 -mt-[76px]" aria-labelledby="finder-title">
      <div className="rounded-[20px] border border-line bg-surface p-[18px] shadow-[0_28px_60px_-34px_rgba(20,24,32,0.5)] md:p-7">
        <h2 id="finder-title" className="mb-4 font-display text-[26px] font-bold leading-[1.1] lg:text-[30px]">
          Trouvez la pièce adaptée à votre véhicule
        </h2>

        <div className="grid items-end gap-3 md:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto]">
          <SelectField
            id="finder-brand"
            label="Marque"
            value={selection.brand}
            options={Object.keys(vehicleCatalog)}
            onChange={(value) => update("brand", value)}
          />
          <SelectField
            id="finder-model"
            label="Modèle"
            value={selection.model}
            options={models}
            disabled={!selection.brand}
            onChange={(value) => update("model", value)}
          />
          <SelectField
            id="finder-year"
            label="Année"
            value={selection.year}
            options={vehicleYears}
            disabled={!hasModel}
            onChange={(value) => update("year", value)}
          />
          <SelectField
            id="finder-engine"
            label="Motorisation"
            value={selection.engine}
            options={vehicleEngines}
            disabled={!hasModel}
            onChange={(value) => update("engine", value)}
          />
          <Button onClick={handleSearch}>
            <Search size={18} aria-hidden="true" />
            Trouver les pièces
          </Button>
        </div>

        <p role="status" aria-live="polite" className={feedback ? "mt-3.5" : ""}>
          {feedback && (
            <span
              className={`block rounded-[10px] px-3.5 py-3 text-sm ${
                feedback.isError ? "bg-accent-soft text-danger" : "bg-accent-soft text-ink"
              }`}
            >
              {feedback.text}
            </span>
          )}
        </p>
      </div>
    </Container>
  );
}
