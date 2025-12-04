
export function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Main footer */}

      {/* Bottom footer */}
      <div className="bg-primary-900 py-4 border-t border-primary-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <img
                  src="/3D_S-Logo-removebg.png"
                  alt="Logo"
                  className="h-8 w-8 rounded"
                />
              <span className="text-xl font-bold">STORE'S</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-primary-300">
              <span>English</span>
              <span>XAF CM</span>
              <span>Cameroon cm</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-primary-700 text-center">
            <p className="text-xs text-gray-400">
              ©2025, STORE'S, All Right Reserve
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}