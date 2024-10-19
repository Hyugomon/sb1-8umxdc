import { Match, TeamStats } from '../types';

const RECENT_MATCHES_WEIGHT = 1.5; // Factor de peso para partidos recientes

const calculateWeightedAverage = (matches: Match[], isLocal: boolean): number => {
  const totalMatches = matches.length;
  let weightedSum = 0;
  let totalWeight = 0;

  matches.forEach((match, index) => {
    const weight = 1 + (index / totalMatches) * RECENT_MATCHES_WEIGHT;
    const goals = isLocal ? parseInt(match.resultado.split('-')[0]) : parseInt(match.resultado.split('-')[1]);
    weightedSum += goals * weight;
    totalWeight += weight;
  });

  return weightedSum / totalWeight;
};

export const calculateTeamStats = (matches: Match[], team: string): TeamStats => {
  const localMatches = matches.filter((m) => m.partido.split(' vs ')[0].trim() === team);
  const visitaMatches = matches.filter((m) => m.partido.split(' vs ')[1].trim() === team);

  const totalMatches = matches.length;
  const totalGolesLocal = matches.reduce((sum, m) => sum + parseInt(m.resultado.split('-')[0]), 0);
  const totalGolesVisita = matches.reduce((sum, m) => sum + parseInt(m.resultado.split('-')[1]), 0);

  const promedioGolesLigaLocal = totalGolesLocal / totalMatches;
  const promedioGolesLigaVisita = totalGolesVisita / totalMatches;

  const golesAnotadosLocal = localMatches.reduce((sum, m) => sum + parseInt(m.resultado.split('-')[0]), 0);
  const golesAnotadosVisita = visitaMatches.reduce((sum, m) => sum + parseInt(m.resultado.split('-')[1]), 0);
  const golesCedidosLocal = localMatches.reduce((sum, m) => sum + parseInt(m.resultado.split('-')[1]), 0);
  const golesCedidosVisita = visitaMatches.reduce((sum, m) => sum + parseInt(m.resultado.split('-')[0]), 0);

  const promedioGolesAnotadosLocal = calculateWeightedAverage(localMatches, true);
  const promedioGolesAnotadosVisita = calculateWeightedAverage(visitaMatches, false);
  const promedioGolesCedidosLocal = golesCedidosLocal / localMatches.length || 0;
  const promedioGolesCedidosVisita = golesCedidosVisita / visitaMatches.length || 0;

  const fuerzaAtaqueLocal = promedioGolesAnotadosLocal / promedioGolesLigaLocal || 1;
  const fuerzaAtaqueVisita = promedioGolesAnotadosVisita / promedioGolesLigaVisita || 1;
  const fuerzaDefensaLocal = promedioGolesCedidosLocal / promedioGolesLigaVisita || 1;
  const fuerzaDefensaVisita = promedioGolesCedidosVisita / promedioGolesLigaLocal || 1;

  const resultadosLocal = localMatches.map((m) => m.resultado);
  const resultadosVisita = visitaMatches.map((m) => m.resultado);
  const marcadorProbableLocal = getMostFrequent(resultadosLocal);
  const marcadorProbableVisita = getMostFrequent(resultadosVisita);

  // Nuevas métricas
  const efectividadLocal = (golesAnotadosLocal / (golesAnotadosLocal + golesCedidosLocal)) * 100 || 0;
  const efectividadVisita = (golesAnotadosVisita / (golesAnotadosVisita + golesCedidosVisita)) * 100 || 0;

  return {
    golesAnotadosLocal: promedioGolesAnotadosLocal,
    golesAnotadosVisita: promedioGolesAnotadosVisita,
    golesCedidosLocal: promedioGolesCedidosLocal,
    golesCedidosVisita: promedioGolesCedidosVisita,
    fuerzaAtaqueLocal,
    fuerzaAtaqueVisita,
    fuerzaDefensaLocal,
    fuerzaDefensaVisita,
    marcadorProbableLocal,
    marcadorProbableVisita,
    golesTotalesLocal: golesAnotadosLocal,
    golesTotalesVisita: golesAnotadosVisita,
    efectividadLocal,
    efectividadVisita,
  };
};

const getMostFrequent = (arr: string[]): string => {
  const frequency: { [key: string]: number } = {};
  let maxFreq = 0;
  let mostFrequent = '';

  arr.forEach((item) => {
    frequency[item] = (frequency[item] || 0) + 1;
    if (frequency[item] > maxFreq) {
      maxFreq = frequency[item];
      mostFrequent = item;
    }
  });

  return mostFrequent;
};