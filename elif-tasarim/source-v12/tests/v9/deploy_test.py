import unittest,importlib.util
from pathlib import Path
p=Path(__file__).resolve().parents[2]/'deploy/publish_v9.py';spec=importlib.util.spec_from_file_location('pub',p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class DeploymentGuards(unittest.TestCase):
 def test_target_repository(self):
  m.validate_remote('https://github.com/OnourImpram/onourimpram.github.io.git')
  m.validate_remote('git@github.com:OnourImpram/onourimpram.github.io.git')
  with self.assertRaises(ValueError):m.validate_remote('https://github.com/other/site.git')
 def test_relative_paths(self):
  self.assertEqual(str(m.safe_relative('assets/model.webp')),'assets/model.webp')
  for x in ['../index.html','/index.html','C:/Windows','foo\\bar']:
   with self.assertRaises(ValueError):m.safe_relative(x)
 def test_manifest(self):
  self.assertEqual(m.verify_package(p.parents[1])['release'],'v9-dual-shelf-atelier')
if __name__=='__main__':unittest.main()
