// « d'Avignon », « de Nîmes » : élision devant voyelle ou h muet.
export function deVille(nom: string): string {
  return /^[aeiouyéèêàâîôûh]/i.test(nom) ? `d’${nom}` : `de ${nom}`;
}
