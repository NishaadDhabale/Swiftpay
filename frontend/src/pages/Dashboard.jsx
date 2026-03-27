import { Appbar } from '../components/Appbar';
import { Balance } from '../components/Balance';
import { Users } from '../components/Users';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setLoading(false);
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.log('Balance API Error:', error);
        setLoading(false);
        navigate('/signin');
      });

    async function fetchUser() {
      await axios
        .get(`${BACKEND_URL}/api/v1/user/me`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then((response) => {
          const userData = response.data.user;
          setUser(userData);
        })
        .catch((error) => {
          console.log('User API Error:', error);
          setLoading(false);
          navigate('/signin');
        });
    }
    fetchUser();
  }, []);
  const [click, setClick] = useState(false);

  return (
    <div>
      <Appbar user={user} />
      <Balance balance={balance} loading={loading} setClick={setClick} />
      <Users click={click} setClick={setClick} />
    </div>
  );
};
