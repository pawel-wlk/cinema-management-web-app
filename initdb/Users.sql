CREATE USER 'client'@'%' IDENTIFIED BY 'clientpassword';

GRANT SELECT, INSERT, UPDATE ON cinemas.client TO 'client'@'%' IDENTIFIED BY 'clientpassword';

-- grant execute jak będzie procedura do rezerwacji

GRANT SELECT ON cinemas.film TO 'client'@'%' IDENTIFIED BY 'clientpassword';
GRANT SELECT ON cinemas.cinema TO 'client'@'%' IDENTIFIED BY 'clientpassword';
GRANT SELECT ON cinemas.display TO 'client'@'%' IDENTIFIED BY 'clientpassword';
GRANT SELECT ON cinemas.room TO 'client'@'%' IDENTIFIED BY 'clientpassword';

CREATE USER 'manager'@'%' IDENTIFIED BY 'managerpassword';

GRANT SELECT, INSERT, UPDATE ON cinemas.manager TO 'manager'@'%' IDENTIFIED BY       'managerpassword';

GRANT SELECT ON cinemas.cinema TO 'manager'@'%' IDENTIFIED BY 'managerpassword';
GRANT SELECT, INSERT, UPDATE ON cinemas.room TO 'manager'@'%' IDENTIFIED BY 'managerpassword';
GRANT SELECT ON cinemas.film TO 'manager'@'%' IDENTIFIED BY 'managerpassword';
GRANT SELECT, INSERT, UPDATE ON cinemas.display TO 'manager'@'%' IDENTIFIED BY 'managerpassword';
GRANT SELECT ON cinemas.reservation TO 'manager'@'%' IDENTIFIED BY 'managerpassword';
GRANT SELECT ON cinemas.mass_reservation TO 'manager'@'%' IDENTIFIED BY 'managerpassword';
GRANT SELECT ON cinemas.display_log TO 'manager'@'%' IDENTIFIED BY 'managerpassword';


CREATE USER 'admin'@'%' IDENTIFIED BY 'adminpassword';

GRANT ALL PRIVILEGES ON cinemas.* TO 'admin'@'%' IDENTIFIED BY 'adminpassword';
