export interface Match {
  fecha: string;
  partido: string;
  resultado: string;
  cuota1: number;
  porcentaje1: number;
  cuotaX: number;
  porcentajeX: number;
  cuota2: number;
  porcentaje2: number;
  cuota1X: number;
  porcentaje1X: number;
  cuotaX2: number;
  porcentajeX2: number;
  cuotaMas15: number;
  porcentajeMas15: number;
  cuotaMenos15: number;
  porcentajeMenos15: number;
  cuotaMas25: number;
  porcentajeMas25: number;
  cuotaMenos25: number;
  porcentajeMenos25: number;
  cuotaMas35: number;
  porcentajeMas35: number;
  cuotaMenos35: number;
  porcentajeMenos35: number;
}

export interface TeamStats {
  golesAnotadosLocal: number;
  golesAnotadosVisita: number;
  golesCedidosLocal: number;
  golesCedidosVisita: number;
  fuerzaAtaqueLocal: number;
  fuerzaAtaqueVisita: number;
  fuerzaDefensaLocal: number;
  fuerzaDefensaVisita: number;
  marcadorProbableLocal: string;
  marcadorProbableVisita: string;
  golesTotalesLocal: number;
  golesTotalesVisita: number;
  efectividadLocal: number;
  efectividadVisita: number;
}