#!/usr/bin/env python3

import os
import pathlib
import sys
from zipfile import ZipFile
import subprocess

def main(release_number):
    project_root = pathlib.Path.cwd()
    build_directory = "build"
    release_directory = os.path.join(project_root, "releases")

    version = f"v1.0.{release_number}"
    release_name = f"pwgen_react_{version}.zip"
    release = os.path.join(release_directory, release_name)

    try:
        with ZipFile(release, "w") as zip_object:
            for (dirPath, dirName, fileNames) in os.walk(build_directory):
                for fileName in fileNames:
                    file = os.path.join(dirPath, fileName)
                    zip_object.write(file)
        
    except Exception as e:
        raise(e)
    
    command = "gh api "
    command += "--method POST "
    command += "-H \"Accept: application/vnd.github+json\" "
    command += "/repos/gnuchu/pwgen-react/releases "
    command += f"-f tag_name='{version}' "
    command += f"-f name='{version}' "
    command += "-F draft=false "
    command += "-F prerelease=false "
    command += "-F generate_release_notes=false "
    print(command)

    result = os.system(command)

    print(result)

if __name__ == "__main__":
    release_number = sys.argv[1]
    main(release_number)