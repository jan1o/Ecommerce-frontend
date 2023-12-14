"use client"

import { useState, useEffect } from 'react'

import authService from "../services/authService"

export const useAuth = () => {

  /*codigo provisorio enquanto api nao funciona
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuth(true);
    setLoading(false);
  }, []);

  return [auth, loading];*/


  //codigo original para quando o backend estuver funcional
  //const [user, setUser] = useState();
  const [user, setUser] = useState();

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  /*
  useEffect(() => {
    //let usuario = null;
    //if(typeof window !== 'undefined'){
      //usuario = JSON.parse(localStorage.getItem('user'));
    //}

    getUserInformations();
  }, []);

  const getUserInformations = () => {
    const usuario = getUser();
    setUser(usuario);
  }*/

  const validate = async() => {
    const res = await authService.validateUser(user.token);
    return res;
  }

  useEffect(() => {
    if(user){
      const res = validate().then((data) => {
        if(data.status === 201){
          setAuth(true);
        }
        else{
          authService.logout();
          setAuth(false);
        }
        setLoading(false);
      });
    } else {
      setAuth(false);
      setLoading(false);
    }
  }, [user]);

  return [auth, loading, setUser];
  


}