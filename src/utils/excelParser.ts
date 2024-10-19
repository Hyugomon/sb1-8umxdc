import { read, utils } from 'xlsx';
import { Match } from '../types';

export const parseExcel = (file: File): Promise<Match[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });
      
      const matches: Match[] = jsonData.slice(1).map((row: any) => ({
        fecha: row[0],
        partido: row[1],
        resultado: row[2],
        cuota1: row[3],
        porcentaje1: row[4],
        cuotaX: row[5],
        porcentajeX: row[6],
        cuota2: row[7],
        porcentaje2: row[8],
        cuota1X: row[9],
        porcentaje1X: row[10],
        cuotaX2: row[11],
        porcentajeX2: row[12],
        cuotaMas15: row[13],
        porcentajeMas15: row[14],
        cuotaMenos15: row[15],
        porcentajeMenos15: row[16],
        cuotaMas25: row[17],
        porcentajeMas25: row[18],
        cuotaMenos25: row[19],
        porcentajeMenos25: row[20],
        cuotaMas35: row[21],
        porcentajeMas35: row[22],
        cuotaMenos35: row[23],
        porcentajeMenos35: row[24],
      }));

      resolve(matches);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const extractTeams = (matches: Match[]): string[] => {
  const teams = new Set<string>();
  matches.forEach((match) => {
    const [local, visita] = match.partido.split(' vs ');
    teams.add(local.trim());
    teams.add(visita.trim());
  });
  return Array.from(teams).sort();
};