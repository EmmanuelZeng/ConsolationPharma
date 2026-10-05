Table users {
    id uuid [primary key]
    nom varchar [not null]
    prenom varchar [not null]
    email varchar [not null, unique]
    password varchar [not null]
    role varchar [not null]
    created_at timestamp
    updated_at timestamp
}

Table medicaments {
    id uuid [primary key]
    categorie_id uuid [not null]
    nom varchar [not null]
    description text
    prix_vente decimal [not null]
    seuil_alerte int [not null]
    created_at timestamp
    updated_at timestamp
}

Table categories {
    id uuid [primary key]
    nom varchar [not null, unique]
    description text
}

Table fournisseurs {
    id uuid [primary key]
    nom varchar [not null]
    telephone varchar
    email varchar
    adresse text
    created_at timestamp
    updated_at timestamp
}

Table lots {
    id uuid [primary key]
    medicament_id uuid [not null]
    fournisseur_id uuid
    numero_lot varchar [not null]
    quantite int [not null]
    prix_achat decimal [not null]
    date_expiration date [not null]
    date_reception date [not null]
    created_at timestamp
    updated_at timestamp
}

Table ventes {
    id uuid [primary key]
    user_id uuid [not null]
    numero_vente varchar [not null, unique]
    montant_total decimal [not null]
    created_at timestamp
}

Table vente_details {
    id uuid [primary key]
    vente_id uuid [not null]
    lot_id uuid [not null]
    quantite int [not null]
    prix_unitaire decimal [not null]
    sous_total decimal [not null]
}

Table achats {
    id uuid [primary key]
    fournisseur_id uuid [not null]
    user_id uuid [not null]
    numero_achat varchar [not null, unique]
    montant_total decimal [not null]
    date_achat date [not null]
    created_at timestamp
}

Table achat_details {
    id uuid [primary key]
    achat_id uuid [not null]
    lot_id uuid [not null]
    quantite int [not null]
    prix_unitaire decimal [not null]
    sous_total decimal [not null]
}


Ref: categories.id < medicaments.categorie_id

Ref: medicaments.id < lots.medicament_id

Ref: fournisseurs.id < lots.fournisseur_id

Ref: users.id < ventes.user_id

Ref: ventes.id < vente_details.vente_id

Ref: lots.id < vente_details.lot_id

Ref: fournisseurs.id < achats.fournisseur_id

Ref: users.id < achats.user_id

Ref: achats.id < achat_details.achat_id

Ref: lots.id < achat_details.lot_id
