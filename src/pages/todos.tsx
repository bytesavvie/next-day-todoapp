import type { NextPage } from 'next';
import Head from 'next/head';
import { ThinBackend } from 'thin-backend-react';
import TodoList from '../components/common/TodoList';

const Todos: NextPage = () => {
  return (
    <ThinBackend>
      <Head>
        <title>Next Day</title>
        <meta name='description' content='Create ToDo list and manage it' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <TodoList />
    </ThinBackend>
  );
};

export default Todos;
