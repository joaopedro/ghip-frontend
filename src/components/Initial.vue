<template>
  <div class="container has-text-centered">
    <div class="column is-6 is-offset-3">
      <h1 class="title">
        {{$t("startPage.commingSoon")}}
      </h1>
      <h2 class="subtitle">
        {{ $t("startPage.tempText") }}
      </h2>
      <div class="box">

        <div class="field is-grouped">
          <p class="control is-expanded">
            <input class="input" type="text" :placeholder="$t('startPage.enterYourEmail')">
          </p>
          <p class="control">
            <a class="button is-info">
              {{$t("startPage.notifyMe")}}
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
