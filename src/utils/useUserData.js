import { useState, useEffect } from 'react';
import useAxios from "./useAxios"


export const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api=useAxios()
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/profile'); // replace with your actual API endpoint
        setUserData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading, error };
};


export const useWhastapp = () => {

  const [whatsappData, setWhatsappData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api=useAxios()
  
  useEffect(() => {
    const fetchWhatsappData = async () => {
      try {
        const response = await api.get('/api/get_whatsapp'); // replace with your actual API endpoint
        setWhatsappData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhatsappData();
  }, []);

  return { whatsappData, loading, error };
}


export const usePeriousBets = () => {
  
  const [periousBets, setPeriousBets] = useState(null);
  const [onLoad, setLoading] = useState(true);
  const [onerror, setError] = useState(null);
  const api=useAxios()

  const username = localStorage.getItem('user');
  
  useEffect(() => {
    const fetchPeriousBets = async () => {
      try {
        const response = await api.get(`/api/get_previous_bets?username=${encodeURIComponent(username)}`); // replace with your actual API endpoint
        setPeriousBets(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPeriousBets();
  }, []);

  return { periousBets, onLoad, onerror };
}


export const usePeriousVotes = () => {

  const [periousVotes, setPeriousVotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api=useAxios()

  const username = localStorage.getItem('user');
  
  useEffect(() => {
    const fetchPeriousVotes = async () => {
      try {
        const response = await api.get(`/api/get_previous_votes?username=${encodeURIComponent(username)}`); // replace with your actual API endpoint
        setPeriousVotes(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPeriousVotes();
  }, []);

  return { periousVotes, loading, error };
}


export const useUserBonus = () => {
  const [userBonu, setUserBonus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api=useAxios()

  const username = localStorage.getItem('user');


  useEffect(() => {
    const fetchUserBonus = async () => {
      try {
        const response = await api.get(`/api/get_user_bonus?username=${encodeURIComponent(username)}`); // replace with your actual API endpoint
        setUserBonus(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBonus();
  }, []);

  return { userBonu, loading, error };
}


export const usebet_loss = () => {

  const [bet_loss, setBet_loss] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api=useAxios()

  const username = localStorage.getItem('user');
  
  useEffect(() => {
    const fetchBet_loss = async () => {
      try {
        const response = await api.get(`/api/bet_loss?username=${encodeURIComponent(username)}`); // replace with your actual API endpoint
        setBet_loss(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBet_loss();
  }, []);

  return { bet_loss, loading, error };
}


export const check_deposit = () => {
    const [check, setCheck_deposit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const api=useAxios()
  
    const username = localStorage.getItem('user');
    
    useEffect(() => {
      const fetchCheck_deposit = async () => {
        try {
          const response = await api.get(`/api/deposit-pending?username=${encodeURIComponent(username)}`); // replace with your actual API endpoint
          setCheck_deposit(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCheck_deposit();
    } , []);

    return { check, loading, error };
}