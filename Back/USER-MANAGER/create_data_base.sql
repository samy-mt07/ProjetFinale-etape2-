-- Création de la base de données
CREATE DATABASE IF NOT EXISTS  ;
USE librairie;

-- 1. users
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
nom VARCHAR(100),
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role ENUM('client','editeur','gestionnaire','administrateur') DEFAULT 'client',
actif BOOLEAN DEFAULT TRUE,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. categories
CREATE TABLE categories (
id INT AUTO_INCREMENT PRIMARY KEY,
nom VARCHAR(100) UNIQUE NOT NULL,
description TEXT
);

-- 3. ouvrages
CREATE TABLE ouvrages (
id INT AUTO_INCREMENT PRIMARY KEY,
titre VARCHAR(255) NOT NULL,
auteur VARCHAR(255),
isbn VARCHAR(50) UNIQUE,
description TEXT,
prix DECIMAL(10,2),
stock INT CHECK (stock >= 0),
categorie_id INT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 4. panier
CREATE TABLE panier (
id INT AUTO_INCREMENT PRIMARY KEY,
client_id INT,
actif BOOLEAN DEFAULT TRUE,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. panier_items
CREATE TABLE panier_items (
id INT AUTO_INCREMENT PRIMARY KEY,
panier_id INT,
ouvrage_id INT,
quantite INT CHECK (quantite > 0),
prix_unitaire DECIMAL(10,2),
FOREIGN KEY (panier_id) REFERENCES panier(id) ON DELETE CASCADE,
FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id) ON DELETE CASCADE
);

-- 6. commandes
CREATE TABLE commandes (
id INT AUTO_INCREMENT PRIMARY KEY,
client_id INT,
date DATETIME DEFAULT CURRENT_TIMESTAMP,
total DECIMAL(10,2),
statut ENUM('en_cours','payee','annulee','expediee') DEFAULT 'en_cours',
adresse_livraison TEXT,
mode_livraison VARCHAR(100),
mode_paiement VARCHAR(100),
payment_provider_id VARCHAR(255),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. commande_items
CREATE TABLE commande_items (
id INT AUTO_INCREMENT PRIMARY KEY,
commande_id INT,
ouvrage_id INT,
quantite INT CHECK (quantite > 0),
prix_unitaire DECIMAL(10,2),
FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id) ON DELETE CASCADE
);

-- 8. listes_cadeaux
CREATE TABLE listes_cadeaux (
id INT AUTO_INCREMENT PRIMARY KEY,
nom VARCHAR(255) NOT NULL,
proprietaire_id INT,
code_partage VARCHAR(100) UNIQUE,
date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (proprietaire_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 9. liste_items
CREATE TABLE liste_items (
id INT AUTO_INCREMENT PRIMARY KEY,
liste_id INT,
ouvrage_id INT,
quantite_souhaitee INT CHECK (quantite_souhaitee > 0),
FOREIGN KEY (liste_id) REFERENCES listes_cadeaux(id) ON DELETE CASCADE,
FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id) ON DELETE CASCADE
);

-- 10. avis
CREATE TABLE avis (
id INT AUTO_INCREMENT PRIMARY KEY,
client_id INT,
ouvrage_id INT,
note INT CHECK (note BETWEEN 1 AND 5),
commentaire TEXT,
date DATETIME DEFAULT CURRENT_TIMESTAMP,
UNIQUE (client_id, ouvrage_id),
FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id) ON DELETE CASCADE
);

-- 11. commentaires
CREATE TABLE commentaires (
id INT AUTO_INCREMENT PRIMARY KEY,
client_id INT,
ouvrage_id INT,
contenu TEXT NOT NULL,
valide BOOLEAN DEFAULT FALSE,
date_soumission DATETIME DEFAULT CURRENT_TIMESTAMP,
date_validation DATETIME,
valide_par INT,
FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (ouvrage_id) REFERENCES ouvrages(id) ON DELETE CASCADE,
FOREIGN KEY (valide_par) REFERENCES users(id) ON DELETE SET NULL
);

-- 12. payments (optionnel)
CREATE TABLE payments (
id INT AUTO_INCREMENT PRIMARY KEY,
commande_id INT,
provider VARCHAR(100),
provider_payment_id VARCHAR(255),
statut VARCHAR(100),
amount DECIMAL(10,2),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE
);