import os

# Chemin du répertoire courant
racine = '.'

# Nom du fichier de sortie
fichier_sortie = 'resultat.txt'

# Dossiers à ignorer
dossiers_a_ignorer = ['venv', '.git', '__pycache__', '.idea', 'node_modules', 'dist']

# Fichiers à ignorer (par nom ou extension)
fichiers_a_ignorer = [
    'package-lock.json',  # Fichiers spécifiques à ignorer

]

# Extensions de fichiers à ignorer
extensions_a_ignorer = [
]

# Compteurs pour le débogage
fichiers_traites = 0
fichiers_ignores = 0

# Fonction pour vérifier si un fichier doit être ignoré
def doit_ignorer_fichier(nom_fichier):
    # Vérifier si le nom du fichier est dans la liste des fichiers à ignorer
    if nom_fichier in fichiers_a_ignorer:
        return True
    
    # Vérifier si l'extension du fichier est dans la liste des extensions à ignorer
    for ext in extensions_a_ignorer:
        if nom_fichier.endswith(ext):
            return True
    
    return False

# Fonction pour traiter les fichiers dans un répertoire
def traiter_repertoire(repertoire, output_file, niveau=0):
    global fichiers_traites, fichiers_ignores
    
    # Lister tous les éléments dans le répertoire
    try:
        elements = os.listdir(repertoire)
        print(f"Exploration du répertoire: {repertoire} ({len(elements)} éléments)")
    except PermissionError:
        print(f"Erreur: Pas de permission pour accéder à {repertoire}")
        output_file.write(f"[Erreur: Pas de permission pour accéder à {repertoire}]\n")
        return
    except Exception as e:
        print(f"Erreur lors de l'accès au répertoire {repertoire}: {e}")
        output_file.write(f"[Erreur lors de l'accès au répertoire {repertoire}: {e}]\n")
        return
    
    for nom_element in elements:
        chemin_element = os.path.join(repertoire, nom_element)
        
        # Si c'est un fichier, écrire son contenu (sauf s'il doit être ignoré)
        if os.path.isfile(chemin_element):
            if doit_ignorer_fichier(nom_element):
                print(f"Fichier ignoré: {chemin_element}")
                fichiers_ignores += 1
                continue
                
            chemin_relatif = os.path.relpath(chemin_element, racine)
            print(f"Traitement du fichier: {chemin_relatif}")
            output_file.write(f"\n{chemin_relatif} :\n{'-' * 40}\n")
            
            try:
                with open(chemin_element, 'r', encoding='utf-8') as f:
                    contenu = f.read()
                    output_file.write(contenu)
                    fichiers_traites += 1
            except UnicodeDecodeError:
                output_file.write(f"[Fichier binaire ou encodage non supporté]\n")
                fichiers_ignores += 1
            except Exception as e:
                output_file.write(f"[Erreur lors de la lecture du fichier : {e}]\n")
                fichiers_ignores += 1
            
            output_file.write("\n\n")  # Saut de ligne entre les fichiers
            output_file.flush()  # Forcer l'écriture sur le disque
        
        # Si c'est un dossier, appel récursif (sauf s'il est dans la liste à ignorer)
        elif os.path.isdir(chemin_element):
            # Ignorer les dossiers spécifiés et les dossiers cachés
            if nom_element in dossiers_a_ignorer or nom_element.startswith('.'):
                print(f"Dossier ignoré: {chemin_element}")
            else:
                traiter_repertoire(chemin_element, output_file, niveau + 1)

# Ouvrir le fichier de sortie en mode écriture
try:
    with open(fichier_sortie, 'w', encoding='utf-8') as output_file:
        output_file.write(f"Exploration du projet à partir de: {os.path.abspath(racine)}\n\n")
        output_file.write(f"Dossiers ignorés: {', '.join(dossiers_a_ignorer)}\n")
        output_file.write(f"Fichiers ignorés: {', '.join(fichiers_a_ignorer)}\n")
        output_file.write(f"Extensions ignorées: {', '.join(extensions_a_ignorer)}\n\n")
        
        traiter_repertoire(racine, output_file)
        
        output_file.write(f"\n\nRésumé: {fichiers_traites} fichiers traités, {fichiers_ignores} fichiers ignorés ou avec erreurs.\n")
    
    # Vérifier si le fichier a été créé et contient des données
    if os.path.exists(fichier_sortie):
        taille = os.path.getsize(fichier_sortie)
        print(f"Le fichier '{fichier_sortie}' a été créé avec succès ({taille} octets)")
        if taille == 0:
            print("ATTENTION: Le fichier est vide!")
    else:
        print(f"ERREUR: Le fichier '{fichier_sortie}' n'a pas été créé!")
        
    print(f"Résumé: {fichiers_traites} fichiers traités, {fichiers_ignores} fichiers ignorés ou avec erreurs.")
    
except Exception as e:
    print(f"Erreur critique lors de l'exécution: {e}")
