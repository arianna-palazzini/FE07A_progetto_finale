export interface Utente {
  id: number;
  username: string;
  email: string;
  password: string;
  nome: string;
  cognome: string;
  roles: [
    {
      id: number;
      roleName: 'ROLE_ADMIN';
    }
  ];
}
