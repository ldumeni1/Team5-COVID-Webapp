USE cases;
INSERT INTO national_level (nl_date, nl_cases, nl_deaths) VALUES ('1111-01-01', 2000, 0);
INSERT INTO national_level (nl_date, nl_cases, nl_deaths) VALUES ('1111-02-02', 3000, 1);
INSERT INTO national_level (nl_date, nl_cases, nl_deaths) VALUES ('1111-03-03', 4000, 2);
INSERT INTO national_level (nl_date, nl_cases, nl_deaths) VALUES ('1111-04-04', 5000, 3);
INSERT INTO national_level (nl_date, nl_cases, nl_deaths) VALUES ('1111-05-05', 5000, 3);

INSERT INTO state_level (sl_date, sl_state, sl_fips, sl_cases, sl_deaths) VALUES ('2222-01-01', 'MD', 0, 1000, 10);
INSERT INTO state_level (sl_date, sl_state, sl_fips, sl_cases, sl_deaths) VALUES ('2222-02-02', 'MD', 1, 2000, 20);
INSERT INTO state_level (sl_date, sl_state, sl_fips, sl_cases, sl_deaths) VALUES ('2222-03-03', 'MD', 2, 3000, 30);
INSERT INTO state_level (sl_date, sl_state, sl_fips, sl_cases, sl_deaths) VALUES ('2222-04-04', 'MD', 3, 4000, 40);

INSERT INTO county_level (cl_date, cl_county, cl_state, cl_fips, cl_cases, cl_deaths, cl_confirmed_cases, cl_confirmed_deaths, 
							cl_probable_cases, cl_probable_deaths ) VALUES ('3333-01-01', 'Howard', 'MD', 0, 1000, 10, 10, 10, 10, 11);
INSERT INTO county_level (cl_date, cl_county, cl_state, cl_fips, cl_cases, cl_deaths, cl_confirmed_cases, cl_confirmed_deaths, 
							cl_probable_cases, cl_probable_deaths ) VALUES ('3333-01-01', 'Baltimore', 'MD', 1, 2000, 20, 20, 20, 20, 20);
INSERT INTO county_level (cl_date, cl_county, cl_state, cl_fips, cl_cases, cl_deaths, cl_confirmed_cases, cl_confirmed_deaths, 
							cl_probable_cases, cl_probable_deaths ) VALUES ('3333-01-01', 'Carrol', 'MD', 2, 3000, 30, 30, 30, 30, 30);
INSERT INTO county_level (cl_date, cl_county, cl_state, cl_fips, cl_cases, cl_deaths, cl_confirmed_cases, cl_confirmed_deaths, 
							cl_probable_cases, cl_probable_deaths ) VALUES ('3333-01-01', 'AnneAruldel', 'MD', 3, 4000, 40, 40, 40, 40, 40);
                            