/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line
import React from 'react';
import styled from '@emotion/styled';
import { Formik, Form } from 'formik';
import { TextField, Button, MenuItem, CircularProgress } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const SubmitButton = styled(Button)({
  marginTop: '16px',
  marginBottom: '8px',
  marginLeft: '16px',
  height: '53px',
  '@media(max-width: 600px)': {
    margin: 0,
    width: '100%'
  }
});

const StandingsForm = ({ isAuthenticated, onSubmit, leagues, loading }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const handleSubmit = values => {
    onSubmit(values);
  };
  return (
    <Formik initialValues={{ espnUrl: '' }} onSubmit={handleSubmit}>
      {({ handleChange, values }) => (
        <Form>
          <div
            css={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isAuthenticated ? (
              <>
                <TextField
                  css={{ backgroundColor: '#fff', textAlign: 'left', minWidth: 250 }}
                  fullWidth={isMobile}
                  select
                  id="league"
                  name="league"
                  label="Select League"
                  onChange={handleChange}
                  value={values.league}
                  margin="normal"
                  variant="outlined"
                >
                  {leagues.map(league => {
                    const leagueId = league.id.split(':')[1];
                    if (
                      leagueId &&
                      league.type.code === 'fantasy' &&
                      league.metaData.entry.abbrev === 'FFL'
                    ) {
                      return (
                        <MenuItem key={leagueId} value={leagueId}>
                          {`${league.metaData.entry.entryLocation} ${league.metaData.entry.entryNickname}`}
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
                </TextField>
                <TextField
                  css={{
                    backgroundColor: '#fff',
                    textAlign: 'left',
                    minWidth: 150,
                    marginLeft: isMobile ? 0 : '0.5rem',
                    marginTop: isMobile && '0'
                  }}
                  fullWidth={isMobile}
                  select
                  id="season"
                  name="season"
                  label="Select Season"
                  onChange={handleChange}
                  value={values.season}
                  margin="normal"
                  variant="outlined"
                >
                  <MenuItem key={2023} value={2023}>
                    2023
                  </MenuItem>
                  <MenuItem key={2018} value={2018}>
                    2018
                  </MenuItem>
                </TextField>
                <SubmitButton
                  css={{ minWidth: 110 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="focus:outline-none"
                >
                  {loading ? <CircularProgress color="inherit" /> : 'Submit'}
                </SubmitButton>
              </>
            ) : (
              <>
                <TextField
                  css={{ backgroundColor: '#fff', flexGrow: 1 }}
                  id="espnUrl"
                  name="espnUrl"
                  label="ESPN League Homepage URL"
                  placeholder="https://fantasy.espn.com/football/league?leagueId=1234567"
                  onChange={handleChange}
                  value={values.espnUrl}
                  margin="normal"
                  variant="outlined"
                />
                <SubmitButton
                  css={{ minWidth: 110 }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="focus:outline-none"
                >
                  {loading ? <CircularProgress color="inherit" /> : 'Calculate'}
                </SubmitButton>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StandingsForm;
