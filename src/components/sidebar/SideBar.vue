<script setup lang="ts">
import CalendarBlank from "@/assets/svg/calendar.svg";
import ChevronRight from "@/assets/svg/shevron.svg";
import Devices from "@/assets/svg/devices.svg";
import Door from "@/assets/svg/door.svg";
import GraduationCap from "@/assets/svg/sessions.svg";
import Archive from "@/assets/svg/archive.svg";
import SettingsIcon from "@/assets/svg/settings.svg";
import LogOut from "@/assets/svg/exit.svg";
import Student from "@/assets/svg/grad.svg";
import UserList from "@/assets/svg/groups.svg";
import Logo from "@/assets/svg/logo.svg";
import Flag from "@/assets/svg/flag.svg"
import {ref} from "vue";

const isOpen = ref(true);

</script>

<template>
  <div class="aside-wrap">
    <transition name="slide">
      <aside class="menu" v-if="isOpen">
        <div class="nav-header">
          <div class="frame-2">
            <div class="frame-3">
              <Logo/>
              <div class="text-wrapper-7">Сим Центр</div>
            </div>
          </div>
        </div>
        <nav class="nav">
          <div class="navButton">
            <CalendarBlank class="icon-instance-node" color="#999999"/>
            <div class="text-wrapper">Расписание</div>
            <div class="icon-instance-node"/>
          </div>
          <div class="navButton selected">
            <GraduationCap class="icon-instance-node"/>
            <div class="text-wrapper">Учебные сессии</div>
            <div class="icon-instance-node"/>
          </div>
          <div class="navButton">
            <Door class="icon-instance-node" color="#999999"/>
            <div class="text-wrapper">Список комнат</div>
            <div class="icon-instance-node"/>
          </div>
          <div class="navButton">
            <Student class="icon-instance-node"/>
            <div class="text-wrapper">Пользователи</div>
          </div>
          <div class="navButton">
            <UserList class="icon-instance-node"/>
            <div class="text-wrapper">Учебные группы</div>
          </div>
          <div class="navButton">
            <Devices class="icon-instance-node" />
            <div class="text-wrapper">Список устройств</div>
          </div>
          <div class="navButton">
            <SettingsIcon class="icon-instance-node"/>
            <div class="text-wrapper">Настройки системы</div>
          </div>
          <div class="navButton">
            <Archive class="icon-instance-node"/>
            <div class="text-wrapper">Архив</div>
          </div>
        </nav>
        <div class="fotter-nav">
          <div class="shadow navButton">
            <div class="frame">
              <div class="text-wrapper-3">Барнаби Мармадюк</div>
              <div class="text-wrapper-4">Преподаватель</div>
            </div>
            <div class="div-wrapper">
              <div class="text-wrapper-5">БМ</div>
            </div>
          </div>
          <div>
            <div class="nav-fotter">
              <div class="navButton">
                <LogOut class="icon-instance-node" color="#999999"/>
                <div class="text-wrapper">Выйти</div>
              </div>
              <div class="navButton">
                <Flag />
                <div class="text-wrapper">Русcкий</div>
                <div class="fether-icons-chevron-wrapper">
                  <ChevronRight class="fether-icons-chevron"/>
                </div>
              </div>
            </div>
            <div class="text-wrapper-6">Версия 1.02</div>
          </div>
        </div>
      </aside>
    </transition>
    <div class="side-bar-wrap">
      <button @click="isOpen = !isOpen"
              class="side-bar-button"
      >
        <ChevronRight
            class="side-bar-chevron"
            :class="{ 'chevron-closed': !isOpen }"
        />
      </button>
    </div>
  </div>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.aside-wrap {
  display: flex;
  overflow-y: auto;
  height: 100vh;

  flex-shrink: 0;
}
.side-bar-wrap {
  height: 100%;
  width: 0.3rem;
  background-color: var(--scbase-5);
  border: 0;
}

.side-bar-button {
  background-color: var(--scbase-1);
  border: 0;
  position: absolute;
  top: 2rem;
  border-radius: 40rem;
  height: 24px;
  width: 24px;
  transform: rotate(90deg) translateY(35%);
}

.side-bar-button:hover {
  background-color: var(--scbase-2);
}

.side-bar-button .chevron-closed {
  transform: rotate(180deg) scale(70%) translateY(15%);
}

.side-bar-chevron {
  color: var(--scbase-6);
  transform: scale(70%);
}

.menu {
  background-color: var(--scbase-6);
  display: flex;
  flex-direction: column;
  width: 274px;

}

.menu .nav-header {
  background-color: var(--scbase-6);
  height: 84px !important;
  display: flex;
  width: 274px;
  flex-shrink: 0;
  position: sticky;
}

.menu .nav {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  height: 100%;
}

.menu .fotter-nav {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 1rem;
}

.menu .icon-instance-node {
  height: 24px !important;
  position: relative !important;
  width: 24px !important;
}

.menu .navButton {
  align-items: flex-start;
  border-radius: 16px;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 12px;
  padding: 12px;
  position: relative;
  transition: background 0.2s;
  width: 100%;
  cursor: pointer;
}

.menu .navButton:hover {
  background-color: #f4f4f4;
}

.menu .selected {
  background-color: var(--scbase-7);
  color: var(--scbase-1);
}

.menu .selected:hover {
  background-color: var(--scbase-17);
}

.menu .text-wrapper {
  color: var(--scbase-1);
  font-family: var(--desktop-body-m-bold-font-family), serif;
  font-size: var(--desktop-body-m-bold-font-size);
  font-style: var(--desktop-body-m-bold-font-style);
  font-weight: var(--desktop-body-m-bold-font-weight);
  letter-spacing: var(--desktop-body-m-bold-letter-spacing);
  line-height: var(--desktop-body-m-bold-line-height);
  margin-top: -1.00px;
  position: relative;
  width: 154px;
}

.menu .selected .text-wrapper {
  color: var(--scbase-6);
}

.menu .shadow {
  box-shadow: 0 4px 24px #0000001f;
}

.menu .frame {
  align-items: flex-start;
  align-self: stretch;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  position: relative;
}

.menu .text-wrapper-3 {
  color: var(--scbase-1);
  font-family: var(--desktop-body-m-bold-font-family);
  font-size: var(--desktop-body-m-bold-font-size);
  font-style: var(--desktop-body-m-bold-font-style);
  font-weight: var(--desktop-body-m-bold-font-weight);
  letter-spacing: var(--desktop-body-m-bold-letter-spacing);
  line-height: var(--desktop-body-m-bold-line-height);
  margin-top: -1.00px;
  position: relative;
  width: 166px;
}

.menu .text-wrapper-4 {
  color: var(--scbase-2);
  flex: 1;
  font-family: var(--desktop-body-s-font-family);
  font-size: var(--desktop-body-s-font-size);
  font-style: var(--desktop-body-s-font-style);
  font-weight: var(--desktop-body-s-font-weight);
  letter-spacing: var(--desktop-body-s-letter-spacing);
  line-height: var(--desktop-body-s-line-height);
  position: relative;
  white-space: nowrap;
  width: 166px;
}

.menu .div-wrapper {
  background-color: var(--scbase-11);
  border-radius: 48px;
  height: 48px;
  overflow: hidden;
  position: relative;
  width: 48px;
}

.menu .text-wrapper-5 {
  color: var(--scbase-6);
  font-family: var(--desktop-body-m-bold-font-family), serif;
  font-size: var(--desktop-body-m-bold-font-size);
  font-style: var(--desktop-body-m-bold-font-style);
  font-weight: var(--desktop-body-m-bold-font-weight);
  height: 48px;
  left: 0;
  letter-spacing: var(--desktop-body-m-bold-letter-spacing);
  line-height: var(--desktop-body-m-bold-line-height);
  position: absolute;
  text-align: center;
  top: 25%;
  width: 48px;
}

.menu .nav-fotter {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

.menu .fether-icons-chevron-wrapper {
  height: 24px;
  position: relative;
  transform: rotate(90.00deg);
  width: 24px;
}

.menu .fether-icons-chevron {
  height: 24px !important;
  left: 0 !important;
  position: absolute !important;
  top: 0 !important;
  transform: rotate(-90.00deg) !important;
  width: 24px !important;
}

.menu .text-wrapper-6 {
  color: var(--scbase-2);
  font-family: var(--body-s-font-family), serif;
  font-size: var(--body-s-font-size);
  font-style: var(--body-s-font-style);
  font-weight: var(--body-s-font-weight);
  letter-spacing: var(--body-s-letter-spacing);
  line-height: var(--body-s-line-height);
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.menu .tui-accordion-item {
  align-items: center;
  background-color: var(--scbase-1);
  border-radius: 48px;
  display: flex;
  height: 24px;
  justify-content: center;
  left: 262px;
  position: absolute;
  top: 30px;
  width: 24px;
}

.menu .left-side {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 12px;
  justify-content: center;
  position: relative;
}

.menu .icon {
  height: 16px;
  position: relative;
  width: 16px;
}

.menu .frame-2 {
  align-items: center;
  display: inline-flex;
  gap: 25px;
  justify-content: center;
  left: 41px;
  position: absolute;
  top: 19px;
}

.menu .frame-3 {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 14px;
  position: relative;
}

.menu .text-wrapper-7 {
  color: var(--scbase-1);
  font-family: "Manrope-ExtraBold", Helvetica, serif;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 28px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}
</style>