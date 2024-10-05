export enum StatusType {
  on_hold = 'em espera',
  called = 'chamado',
  forwarded = 'encaminhado',
  showed_up = 'compareceu',
  in_process = 'em atendimento',
  concluded = 'concluído',
  absent = 'faltou',
  withdrawal = 'desistência',
  disabled = 'desabilitado',
  forwarded_with_return = 'encaminhado com retorno',
  scheduled = 'agendado',
}

export enum StatusSchedule {
  'em espera' = 'on_hold',
  'chamado' = 'called',
  'encaminhado' = 'forwarded',
  'em atendimento' = 'in_process',
  'concluído' = 'concluded',
  'faltou' = 'absent',
}

