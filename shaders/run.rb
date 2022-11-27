#!/usr/bin/env ruby

def which(cmd)
	exts = ENV['PATHEXT'] ? ENV['PATHEXT'].split(';') : ['']
	ENV['PATH'].split(File::PATH_SEPARATOR).each do |path|
	  exts.each do |ext|
		exe = File.join(path, "#{cmd}#{ext}")
		return exe if File.executable?(exe) && !File.directory?(exe)
	  end
	end
	nil
  end

if which("glslviewer")
	puts "Executing glslviewer..."
	file = ARGV[0]
	system("glslviewer src/#{file}")
else
	puts "You do not have glslviewer installed. Please install."
end

puts "Exit 1"