import { Button, VStack } from '@chakra-ui/react';
import React from 'react';

import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();

  return (
    <VStack p="16" boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'} s="8">
      <Linkbuttonicon
        text="Dashboard"
        url={`dashboard`}
        active={location.pathname === '/admin/dashboard'}
      />
      <Linkbuttonicon
        text="Create Course"
        url={`createcourse`}
        active={location.pathname === '/admin/createcourse'}
      />
      <Linkbuttonicon
        text="Courses"
        url={`courses`}
        active={location.pathname === '/admin/courses'}
      />
      <Linkbuttonicon
        text="Users"
        url={`users`}
        active={location.pathname === '/admin/users'}
      />
    </VStack>
  );
};

export default SideBar;

function Linkbuttonicon({ url, text, active }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={'lg'}
        variant={'ghost'}
        colorScheme={active ? 'purple' : ''}
      >
        {text}
      </Button>
    </Link>
  );
}
