<template>
  <div>
    <h1>home page</h1>
    <div>{{ data || "no data" }}</div>
    <div>{{ token || "no token" }}</div>
    <button @click="getdata">get</button>

    <button @click="logout">logout</button>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const token = useCookie("XSRF-TOKEN");

const { data, execute } = useFetch(`${config.public.API_BASE_URL}/get`, {
  headers: {
    contentType: "application/json",
    accept: "application/json",
  },
  credentials: "include",
  immediate: false,
});

const getdata = () => {
  execute();
};

const { logoutUser } = useAuth();

const logout = () => {
  logoutUser();
};
</script>
