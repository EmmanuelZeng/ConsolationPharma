import { Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

type MedicamentOption = {
  id: string
  nom: string
  prixVente: number
  stock: number
}

export type VenteLigneForm = {
  key: string
  medicamentId: string
  quantite: string
}

function createEmptyLine(medicaments: MedicamentOption[]): VenteLigneForm {
  return {
    key: crypto.randomUUID(),
    medicamentId: medicaments[0]?.id ?? '',
    quantite: '',
  }
}

export default function VenteLignesForm({ medicaments }: { medicaments: MedicamentOption[] }) {
  const [lignes, setLignes] = useState<VenteLigneForm[]>(() => [createEmptyLine(medicaments)])

  const medicamentById = useMemo(() => {
    return new Map(medicaments.map((medicament) => [medicament.id, medicament]))
  }, [medicaments])

  const totalEstime = useMemo(() => {
    return lignes.reduce((sum, ligne) => {
      const medicament = medicamentById.get(ligne.medicamentId)
      const q = Number(ligne.quantite)
      if (!medicament || !Number.isFinite(q)) {
        return sum
      }
      return sum + q * medicament.prixVente
    }, 0)
  }, [lignes, medicamentById])

  function addLine() {
    setLignes((current) => [...current, createEmptyLine(medicaments)])
  }

  function removeLine(key: string) {
    setLignes((current) => {
      if (current.length === 1) {
        return current
      }
      return current.filter((line) => line.key !== key)
    })
  }

  function updateLine(key: string, field: keyof Omit<VenteLigneForm, 'key'>, value: string) {
    setLignes((current) =>
      current.map((line) => (line.key === key ? { ...line, [field]: value } : line))
    )
  }

  return (
    <div className="line-items">
      {lignes.map((ligne, index) => {
        const medicament = medicamentById.get(ligne.medicamentId)
        const stock = medicament?.stock ?? 0
        const prix = medicament?.prixVente ?? 0

        return (
          <fieldset key={ligne.key} className="line-items__block panel">
            <div className="line-items__head">
              <legend>Ligne {index + 1}</legend>
              {lignes.length > 1 && (
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() => removeLine(ligne.key)}
                >
                  <Trash2 size={14} /> Retirer
                </button>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`medicament-${ligne.key}`}>
                Médicament
              </label>
              <select
                id={`medicament-${ligne.key}`}
                name={`lignes[${index}][medicamentId]`}
                className="field__input"
                value={ligne.medicamentId}
                onChange={(event) => updateLine(ligne.key, 'medicamentId', event.target.value)}
                required
              >
                {medicaments.map((item) => (
                  <option key={item.id} value={item.id} disabled={item.stock <= 0}>
                    {item.nom} — stock {item.stock} — {item.prixVente} FC
                  </option>
                ))}
              </select>
              {stock <= 0 && (
                <span className="field__error">Ce médicament est en rupture de stock.</span>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor={`qty-${ligne.key}`}>
                Quantité
              </label>
              <input
                id={`qty-${ligne.key}`}
                name={`lignes[${index}][quantite]`}
                type="number"
                min={1}
                max={stock > 0 ? stock : undefined}
                className="field__input"
                value={ligne.quantite}
                onChange={(event) => updateLine(ligne.key, 'quantite', event.target.value)}
                required
              />
              <span className="muted" style={{ fontSize: 12 }}>
                Prix unitaire : {prix.toLocaleString('fr-FR')} FC
              </span>
            </div>
          </fieldset>
        )
      })}

      <button type="button" className="btn btn--secondary btn--sm" onClick={addLine}>
        <Plus size={14} /> Ajouter une ligne
      </button>

      <p className="line-items__total">
        Total estimé : <strong>{totalEstime.toLocaleString('fr-FR')} FC</strong>
      </p>
    </div>
  )
}
