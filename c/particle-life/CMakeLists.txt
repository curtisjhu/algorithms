cmake_minimum_required(VERSION 1.0.0)
set(PROJECT_NAME Particle_Life)
cmake_language(CXX)

file(GLOB_RECURSE source_files
	"src/*.cpp"
	"include/*.hpp"
)

set(SOURCES ${source_files})

