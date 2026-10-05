import { Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

type MedicamentOption = { id: string; nom: string }

export type AchatLigneForm = {
  key: string
  medicamentId: string
  numeroLot: string
  quantite: string
  prixUnitaire: string
  dateExpiration: string
}

function createEmptyLine(medicaments: MedicamentOption[]): AchatLigneForm {
  return {
    key: crypto.randomUUID(),
    medicamentId: medicaments[0]?.id ?? '',
    numeroLot: '',
    quantite: '',
    prixUnitaire: '',
    dateExpiration: '',
  }
}

export default function AchatLignesForm({ medicaments }: { medicaments: MedicamentOption[] }) {
  const [lignes, setLignes] = useState<AchatLigneForm[]>(() => [createEmptyLine(medicaments)])

  const totalEstime = useMemo(() => {
    return lignes.reduce((sum, ligne) => {
      const q = Number(ligne.quantite)
      const p = Number(ligne.prixUnitaire)
      if (!Number.isFinite(q) || !Number.isFinite(p)) {
        return sum
      }
      return sum + q * p
    }, 0)
  }, [lignes])

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

  function updateLine(key: string, field: keyof Omit<AchatLigneForm, 'key'>, value: string) {
    setLignes((current) =>
      current.map((line) => (line.key === key ? { ...line, [field]: value } : line))
    )
  }

  return (
    <div className="line-items">
      {lignes.map((ligne, index) => (
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
              {medicaments.map((medicament) => (
                <option key={medicament.id} value={medicament.id}>
                  {medicament.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field__label" htmlFor={`lot-${ligne.key}`}>
              Numéro de lot
            </label>
            <input
              id={`lot-${ligne.key}`}
              name={`lignes[${index}][numeroLot]`}
              className="field__input"
              value={ligne.numeroLot}
              onChange={(event) => updateLine(ligne.key, 'numeroLot', event.target.value)}
              required
            />
          </div>

          <div className="line-items__row">
            <div className="field">
              <label className="field__label" htmlFor={`qty-${ligne.key}`}>
                Quantité
              </label>
              <input
                id={`qty-${ligne.key}`}
                name={`lignes[${index}][quantite]`}
                type="number"
                min={1}
                className="field__input"
                value={ligne.quantite}
                onChange={(event) => updateLine(ligne.key, 'quantite', event.target.value)}
                required
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor={`price-${ligne.key}`}>
                Prix unitaire
              </label>
              <input
                id={`price-${ligne.key}`}
                name={`lignes[${index}][prixUnitaire]`}
                type="number"
                min={0}
                step="0.01"
                className="field__input"
                value={ligne.prixUnitaire}
                onChange={(event) => updateLine(ligne.key, 'prixUnitaire', event.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor={`exp-${ligne.key}`}>
              Date d expiration
            </label>
            <input
              id={`exp-${ligne.key}`}
              name={`lignes[${index}][dateExpiration]`}
              type="date"
              className="field__input"
              value={ligne.dateExpiration}
              onChange={(event) => updateLine(ligne.key, 'dateExpiration', event.target.value)}
              required
            />
          </div>
        </fieldset>
      ))}

      <button type="button" className="btn btn--secondary btn--sm" onClick={addLine}>
        <Plus size={14} /> Ajouter une ligne
      </button>

      <p className="line-items__total">
        Total estimé : <strong>{totalEstime.toLocaleString('fr-FR')} FC</strong>
        <span className="muted"> (recalculé côté serveur à la validation)</span>
      </p>
    </div>
  )
}
