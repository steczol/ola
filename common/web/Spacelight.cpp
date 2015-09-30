/*
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Library General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * ArtNetPlugin.cpp
 * The ArtNet plugin for ola
 * Copyright (C) 2005 Simon Newton
 *
#include <cppunit/extensions/HelperMacros.h>
#include <set>
#include <vector>
#include <stdlib.h>
#include <stdio.h>
#include <string>

#include "ola/Logging.h"
#include "ola/StringUtils.h"
#include "olad/Preferences.h"
//#include "plugins/artnet/ArtNetPlugin.h"
//#include "plugins/artnet/ArtNetDevice.h"

using ola::BoolValidator;
using ola::FileBackedPreferences;
using ola::FileBackedPreferencesFactory;
using ola::IntToString;
using ola::IntValidator;
using ola::UIntValidator;
using ola::MemoryPreferencesFactory;
using ola::Preferences;
using ola::SetValidator;
using ola::StringValidator;
using ola::IPv4Validator;
using std::string;
using std::vector;

public:
    void setUp() {
      ola::InitLogging(ola::OLA_LOG_DEBUG, ola::OLA_LOG_STDERR);
    }
    //void testValidators();
    void testGetSetRemove();
    //void testBool();
    //void testFactory();
    //void testLoad();
    //void testSave();
};

const char Spacelight::Intensity[] = "50";
const char Spacelight::ColorTemp[] = "4500";
const char Spacelight::DMX[] = "1";
const char Spacelight::OnOff[] = "1";
const char Spacelight::Advanced[] = "0";
const char Spacelight::Info[] = "0";

void Spacelight::Save() {
  const string data_path = TEST_BUILD_DIR "/olad/ola-output.conf";

  ola::FilePreferenceSaverThread saver_thread;
  saver_thread.Start();
  FileBackedPreferences *preferences = new FileBackedPreferences(
      TEST_BUILD_DIR "/olad", "output", &saver_thread);
  preferences->Clear();

  unlink(data_path.c_str());
  string key1 = "foo";
  string key2 = "bat";
  string key3 = "/dev/ttyUSB0";
  string value1 = "bar";
  string value2 = "baz";
  string value3 = "boo";
  string multi_key = "multi";
  preferences->SetValue(key1, value1);
  preferences->SetValue(key2, value2);
  preferences->SetValue(key3, value3);
  preferences->SetMultipleValue(multi_key, "1");
  preferences->SetMultipleValue(multi_key, "2");
  preferences->SetMultipleValue(multi_key, "3");
  preferences->Save();

  saver_thread.Syncronize();

  FileBackedPreferences *input_preferences = new
    FileBackedPreferences("", "input", NULL);
  input_preferences->LoadFromFile(data_path);
  OLA_ASSERT(*preferences == *input_preferences);
  delete preferences;
  delete input_preferences;

  saver_thread.Join();
}



bool ArtNetPlugin::SetDefaultPreferences() {
  bool save = false;

  if (!m_preferences) {
    return false;
  }

  save |= m_preferences->SetDefaultValue(ArtNetDevice::K_IP_KEY,
                                         StringValidator(true), "");
  save |= m_preferences->SetDefaultValue(ArtNetDevice::K_SHORT_NAME_KEY,
                                         StringValidator(),
                                         ARTNET_SHORT_NAME);
  save |= m_preferences->SetDefaultValue(ArtNetDevice::K_LONG_NAME_KEY,
                                         StringValidator(),
                                         ARTNET_LONG_NAME);
  save |= m_preferences->SetDefaultValue(ArtNetDevice::K_NET_KEY,
                                         UIntValidator(0, 127),
                                         ArtNetDevice::K_ARTNET_NET);
  save |= m_preferences->SetDefaultValue(ArtNetDevice::K_SUBNET_KEY,
                                         UIntValidator(0, 15),
                                         ArtNetDevice::K_ARTNET_SUBNET);
  save |= m_preferences->SetDefaultValue(
      ArtNetDevice::K_OUTPUT_PORT_KEY,
      UIntValidator(0, 16),
      ArtNetDevice::K_DEFAULT_OUTPUT_PORT_COUNT);
  save |= m_preferences->SetDefaultValue(ArtNetDevice::K_ALWAYS_BROADCAST_KEY,
                                         BoolValidator(),
                                         false);
  save |= m_preferences->SetDefaultValue(ArtNetDevice::K_LIMITED_BROADCAST_KEY,
                                         BoolValidator(),
                                         false);
  save |= m_preferences->SetDefaultValue(ArtNetDevice::K_LOOPBACK_KEY,
                                         BoolValidator(),
                                         false);

  if (save) {
    m_preferences->Save();
  }

  // check if this saved correctly
  // we don't want to use it if null
  if (m_preferences->GetValue(ArtNetDevice::K_SHORT_NAME_KEY).empty() ||
      m_preferences->GetValue(ArtNetDevice::K_LONG_NAME_KEY).empty() ||
      m_preferences->GetValue(ArtNetDevice::K_SUBNET_KEY).empty() ||
      m_preferences->GetValue(ArtNetDevice::K_OUTPUT_PORT_KEY).empty() ||
      m_preferences->GetValue(ArtNetDevice::K_NET_KEY).empty()) {
    return false;
  }

  return true;
} */
