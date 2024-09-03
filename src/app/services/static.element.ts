export abstract class StaticElement {
      //state = {0: inactive, 1: active, 2: realized, 3: canceled}
  public static state_activity = [
    { id: 0, name: 'Pendiente', color: 'warning' },
    { id: 1, name: 'Agendada', color: 'secondary' },
    { id: 2, name: 'Cancelada', color: 'danger' },
    { id: 3, name: 'Completada', color: 'success' }
  ];
}