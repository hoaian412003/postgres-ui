import { checkConnection } from '@/utils/database';
import React, { useMemo } from 'react';
import { CiCircleCheck } from "react-icons/ci";
import { toast } from 'react-toastify';
import { saveDatabaseConfig, saveDfatabaseConfig } from '../actions';
import { useRouter } from 'next/navigation';

export const SetUpDatabase = () => {

  const [loading, setLoading] = React.useState(false);
  const [host, setHost] = React.useState('');
  const [port, setPort] = React.useState(5432);
  const [user, setUser] = React.useState('');
  const [verified, setVerified] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const completion = useMemo(() => {
    setVerified(false);
    return host && port && user && password;
  }, [host, port, user, password]);

  const handleVerify = async () => {
    try {
      setLoading(true);
      await checkConnection({
        host,
        port: parseInt(port, 10),
        user,
        password
      });
      setVerified(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setVerified(false);
      toast.error('Failed to connect to the database: ' + error.message);
    }
  }

  const onSaveDatabase = async () => {
    setLoading(true);
    saveDatabaseConfig({
      host,
      port: parseInt(port, 10),
      user,
      password
    }).then(() => {
      setLoading(false);
      router.push('/databases');
      toast.success('Database configuration saved successfully!');
    }).catch((error) => {
      setLoading(false);
      toast.error('Failed to save database configuration: ' + error.message);
    })
  }

  return <div className="w-full">
    <legend className="fieldset-legend" >Host</legend>
    <input type="text" className='input w-full' placeholder='example.host'
      onChange={(e) => setHost(e.target.value)}
    />

    <legend className="fieldset-legend">Port</legend>
    <input type="number" className='input w-full' placeholder='5432'
      onChange={(e) => setPort(e.target.value)}
    />

    <legend className="fieldset-legend">User</legend>
    <input type="text" className='input w-full' placeholder='db_user'
      onChange={(e) => setUser(e.target.value)}
    />

    <legend className="fieldset-legend">Password</legend>
    <input type="password" className='input w-full' placeholder='db_password'
      onChange={(e) => setPassword(e.target.value)}
    />

    <div className="flex align-center mt-4 w-full gap-2">
      <button className="btn btn-primary flex-1" disabled={!verified} onClick={onSaveDatabase}>
        {loading ? <span className="loading loading-spinner"></span> : 'Save'}
      </button>

      <button className="btn btn-square" disabled={!completion} onClick={handleVerify}>
        <CiCircleCheck className={`text-2xl ${verified ? 'text-green-500' : ''}`} />
      </button>
    </div>

  </div>
}
